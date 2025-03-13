import { useRef, useEffect, useContext, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import { GlobalStateContext } from "../provider/globalProvider";
import * as turf from "@turf/turf";
import { urbanData } from "./Data";
import OverlayChart from "./OverlayChart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

function MapOverlay() {
  const { state, setState } = useContext(GlobalStateContext);
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const animationRef = useRef(null);
  const currentBufferSize = useRef(state.bufferArea);

  const geoJsonData = useMemo(
    () => ({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { id: 1 },
          geometry: {
            type: "LineString",
            coordinates: [
              [112.328702941366686, -7.458199186124536],
              [112.328932088228655, -7.458065517121718],
              [112.329361738594855, -7.457605313840587],
              [112.32953550829852, -7.457420086793825],
              [112.329657719958234, -7.457351342735234],
              [112.329779931617949, -7.457334156720585],
            ],
          },
        },
      ],
    }),
    []
  );

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5kaXN1cnlhMTAiLCJhIjoiY2w4amt5bnFqMDJzajN3b2d6aTdjZXpkeiJ9.N3coQCudOQJRf5c5r8BVQA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 0,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("lineSource", {
        type: "geojson",
        data: geoJsonData,
      });

      mapRef.current.addLayer({
        id: "lineLayer",
        type: "line",
        source: "lineSource",
        paint: {
          "line-color": "blue",
          "line-width": 6,
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      geoJsonData.features[0].geometry.coordinates.forEach((coord) => {
        bounds.extend(coord);
      });

      mapRef.current.fitBounds(bounds, {
        zoom: 17,
        speed: 1,
        essential: false,
      });
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("polygonSource", {
        type: "geojson",
        data: urbanData,
      });

      // Add a fill layer for polygons
      mapRef.current.addLayer({
        id: "polygonLayer",
        type: "fill",
        source: "polygonSource",
        paint: {
          "fill-color": "#ADA1AE",
          "fill-opacity": 0.3,
        },
      });

      mapRef.current.addLayer({
        id: "polygonBorder",
        type: "line",
        source: "polygonSource",
        paint: {
          "line-color": "#000000",
          "line-width": 1,
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const animateBuffer = (targetBuffer) => {
    cancelAnimationFrame(animationRef.current);

    const step = () => {
      currentBufferSize.current +=
        (targetBuffer - currentBufferSize.current) * 0.1;
      if (Math.abs(targetBuffer - currentBufferSize.current) < 0.5) {
        currentBufferSize.current = targetBuffer;
      } else {
        animationRef.current = requestAnimationFrame(step);
      }
      updateBufferLayer(
        currentBufferSize.current,
        geoJsonData,
        urbanData,
        mapRef
      );
    };

    step();
  };

  const updateBufferLayer = (
    bufferDistance,
    geoJsonData,
    urbanData,
    mapRef
  ) => {
    if (!geoJsonData) return;

    // Create a buffered GeoJSON around the input data
    const bufferedGeoJson = turf.buffer(geoJsonData, bufferDistance, {
      units: "meters",
    });

    // Update or add the buffer layer
    if (mapRef.current.getLayer("bufferLayer")) {
      mapRef.current.getSource("bufferSource").setData(bufferedGeoJson);
    } else {
      mapRef.current.addSource("bufferSource", {
        type: "geojson",
        data: bufferedGeoJson,
      });

      mapRef.current.addLayer({
        id: "bufferLayer",
        type: "fill",
        source: "bufferSource",
        paint: {
          "fill-color": "#87CEEB",
          "fill-opacity": 0.4,
          "fill-outline-color": "black",
        },
      });
    }

    const intersectedCategories = [];
    const geometry = [];

    turf.featureEach(urbanData, (urbanFeature) => {
      if (turf.booleanIntersects(urbanFeature, bufferedGeoJson)) {
        if (urbanFeature.properties && urbanFeature.properties.category) {
          intersectedCategories.push(urbanFeature.properties.category);
          geometry.push(urbanFeature.geometry);
        }
      }
    });

    // Count occurrences of each category
    const categoryCounts = intersectedCategories.reduce((acc, category) => {
      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});

    setState((prev) => ({ ...prev, chartDataOvrly: categoryCounts }));

    const intersectedFeatures = {
      type: "FeatureCollection",
      features: geometry.map((geom, index) => ({
        type: "Feature",
        geometry: geom,
        properties: {
          category: intersectedCategories[index],
        },
      })),
    };

    // Remove the previous intersected layer if it exists
    if (mapRef.current.getLayer("intersectedLayer")) {
      mapRef.current.removeLayer("intersectedLayer");
      mapRef.current.removeSource("intersectedSource");
    }

    mapRef.current.addSource("intersectedSource", {
      type: "geojson",
      data: intersectedFeatures,
    });

    mapRef.current.addLayer({
      id: "intersectedLayer",
      type: "fill",
      source: "intersectedSource",
      paint: {
        "fill-color": [
          "match",
          ["get", "category"],
          "URBAN",
          "#FE9900",
          "GRASS LAND",
          "#E101FF",
          "AGRICULTURE",
          "#00FF00",
          "#CCCCCC",
        ],
        "fill-opacity": 0.3,
      },
    });

    console.log(intersectedFeatures);
  };

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setState((prev) => ({ ...prev, bufferArea: newValue }));
    animateBuffer(newValue);
  };

  const sentence = "Disaster Irigation Risk Effect".split(" ");

  return (
    <motion.div
      className="w-screen max-w-8xl mx-auto h-[900px] flex flex-col md:flex-row bg-white text-black text-lg shadow-lg rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {/* Left Side: Title and Content */}
      <motion.div
        className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-wrap justify-center mt-4">
          {sentence.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="text-2xl font-semibold tracking-wide inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="w-full h-[400px] flex justify-center mt-4">
          {" "}
          {/* Ensure enough space */}
          <OverlayChart />
        </motion.div>
      </motion.div>

      {/* Right Side: Map */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 border-r border-gray-600 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.div
          id="map-container"
          ref={mapContainerRef}
          className="w-full h-[50vh] md:h-[60vh] rounded-lg overflow-hidden relative"
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(255, 255, 255, 0.9)", // Slightly more opaque
              padding: "12px 16px", // Increased padding
              borderRadius: "8px", // Smoother corners
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Deeper shadow
              zIndex: 1000,
              textAlign: "center",
              fontFamily: "'Arial', sans-serif", // Use a clean font
              width: "340px", // Fixed width for better proportion
            }}
          >
            {/* Slider Input */}
            <input
              type="range"
              min="1"
              max="100"
              defaultValue={state.bufferArea}
              onChange={handleSliderChange}
              style={{
                width: "100%", // Full width of the container
                cursor: "pointer", // Indicate interactivity
                accentColor: "#007BFF", // Modern browser accent color
              }}
            />

            {/* Buffer Value Display */}
            <p
              style={{
                marginTop: "8px", // Slightly more spacing
                color: "#333", // Darker text for better readability
                fontWeight: "600", // Semi-bold
                fontSize: "14px", // Slightly larger font
                letterSpacing: "0.5px", // Improve readability
              }}
            >
              Buffer: {state.bufferArea} m
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MapOverlay;
