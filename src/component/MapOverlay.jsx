import { useRef, useEffect, useContext, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import { GlobalStateContext } from "../provider/globalProvider";
import * as turf from "@turf/turf";
import { urbanData } from "./Data";

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
        zoom: 18,
        speed: 1,
        pitch: 50,
        bearing: 35,
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
          "fill-color": "#ff0000",
          "fill-opacity": 0.3,
        },
      });

      // Add a border line for polygons
      mapRef.current.addLayer({
        id: "polygonBorder",
        type: "line",
        source: "polygonSource",
        paint: {
          "line-color": "#000000",
          "line-width": 2,
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
      updateBufferLayer(currentBufferSize.current);
    };

    step();
  };

  const [intersectedFeatures, setIntersectedFeatures] = useState([]);

  const updateBufferLayer = (bufferDistance) => {
    if (!geoJsonData) return;

    const bufferedGeoJson = turf.buffer(geoJsonData, bufferDistance, {
      units: "meters",
    });

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
          "fill-color": "#87CEEB", // Sky Blue
          "fill-opacity": 0.4,
          "fill-outline-color": "black", // Stroke Black
        },
      });
    }

    const intersectedCategories = [];

    turf.featureEach(urbanData, (urbanFeature) => {
      if (turf.booleanIntersects(urbanFeature, bufferedGeoJson)) {
        if (urbanFeature.properties && urbanFeature.properties.category) {
          intersectedCategories.push(urbanFeature.properties.category);
        }
      }
    });

    const categoryCounts = intersectedCategories.reduce((acc, category) => {
      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});

    console.log("Category Counts:", categoryCounts);
  };

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setState((prev) => ({ ...prev, bufferArea: newValue }));
    animateBuffer(newValue);
  };

  const sentence = "Welcome to Indonesia".split(" ");

  return (
    <motion.div
      className="w-screen max-w-8xl mx-auto flex flex-col md:flex-row bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-lg shadow-lg rounded-lg overflow-hidden"
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
              background: "rgba(255, 255, 255, 0.8)",
              padding: "8px 12px",
              borderRadius: "5px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              textAlign: "center", // ✅ Center text
            }}
          >
            <input
              type="range"
              min="1"
              max="100"
              defaultValue={state.bufferArea}
              onChange={handleSliderChange}
              style={{ width: "150px" }}
            />

            {/* ✅ Show latest buffer value in black color below the slider */}
            <p style={{ marginTop: "5px", color: "black", fontWeight: "bold" }}>
              {"buffer "}
              {state.bufferArea} `m`
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MapOverlay;
