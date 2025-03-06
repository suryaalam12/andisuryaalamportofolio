import { useRef, useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { geojson } from "./Data";
import DepthVsMagnitudeChart from "./ChartData";
import "mapbox-gl/dist/mapbox-gl.css";
import { GlobalStateContext } from "../provider/globalProvider";

function MapPlay() {
  const { state } = useContext(GlobalStateContext);
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const sentence = "Click to Explore, Building Dynamic Visualizations".split(
    " "
  );

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5kaXN1cnlhMTAiLCJhIjoiY2w4amt5bnFqMDJzajN3b2d6aTdjZXpkeiJ9.N3coQCudOQJRf5c5r8BVQA";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [0, 0],
      zoom: 1,
      pitch: 60,
      bearing: 0,
      antialias: true,
    });

    mapRef.current.on("load", () => {
      // Add terrain source
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      // Add 3D terrain
      mapRef.current.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5, // Adjust terrain exaggeration for effect
      });

      // Add hillshading layer
      mapRef.current.addLayer({
        id: "hillshading",
        source: "mapbox-dem",
        type: "hillshade",
      });

      // Add your points layer
      mapRef.current.addSource("points", {
        type: "geojson",
        data: geojson,
      });

      // Add a buffer zone around Kelud Mountain

      mapRef.current.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "magnitude"],
            4.5,
            5,
            6.0,
            10,
            6.5,
            15,
            7.0,
            20,
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "magnitude"],
            4.5,
            "#FFEDA0",
            5.0,
            "#FEB24C",
            5.5,
            "#FC4E2A",
            6.0,
            "#E31A1C",
            6.5,
            "#BD0026",
            7.0,
            "#800026",
          ],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#000",
        },
      });

      mapRef.current.addLayer({
        id: "buffer-zone",
        type: "circle",
        source: {
          type: "geojson",
          data: geojson,
        },
        paint: {
          "circle-radius": 0, // Start with 0 radius
          "circle-color": "rgba(255, 0, 0, 0.2)",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#FF0000",
        },
      });

      let radius = 0;
      const maxRadius = 90000; // Maximum radius in meters
      const animationDuration = 2000; // Duration of the animation in milliseconds

      const animateBufferZone = () => {
        radius += 500; // Increment the radius
        if (radius > maxRadius) radius = 0; // Reset the radius

        // Update the circle radius
        mapRef.current.setPaintProperty("buffer-zone", "circle-radius", {
          stops: [
            [0, 0],
            [20, radius],
          ],
          base: 2,
        });

        // Repeat the animation
        requestAnimationFrame(animateBufferZone);
      };

      // Start the animation
      animateBufferZone();

      // Fit bounds to the geojson data initially
      const bounds = new mapboxgl.LngLatBounds();
      geojson.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates);
      });
      mapRef.current.fitBounds(bounds, {
        padding: 50,
        duration: 5000, // Smooth animation for initial bounds
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  // Watch for changes in state.latLng
  useEffect(() => {
    if (mapRef.current && state.latLng) {
      // Smoothly animate to the new latLng
      mapRef.current.flyTo({
        center: state.latLng,
        zoom: 10, // Adjust zoom level as needed
        speed: 1.2, // Control the speed of the animation
        pitch: 60, // Tilt the map for 3D effect
        bearing: 0, // Rotation of the map
        curve: 1.42, // Smoother curve for the animation
        essential: true, // Ensure the animation completes
      });
    }
  }, [state.latLng]);

  function Legend() {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0, scale: 0.2 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-10 right-10 bg-black/30 text-white p-4 rounded-lg shadow-lg"
      >
        <h4 className="font-semibold mb-2">Earthquake Magnitude</h4>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: "#FFEDA0" }}
            ></div>
            <span>4.5 - 5.0</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full mr-2"
              style={{ backgroundColor: "#FEB24C" }}
            ></div>
            <span>5.0 - 5.5</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded-full mr-2"
              style={{ backgroundColor: "#FC4E2A" }}
            ></div>
            <span>5.5 - 6.0</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full mr-2"
              style={{ backgroundColor: "#E31A1C" }}
            ></div>
            <span>6.0 - 6.5</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-12 h-12 rounded-full mr-2"
              style={{ backgroundColor: "#BD0026" }}
            ></div>
            <span>6.5 - 7.0</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-14 h-14 rounded-full mr-2"
              style={{ backgroundColor: "#800026" }}
            ></div>
            <span>7.0+</span>
          </div>
        </div>
      </motion.div>
    );
  }

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
        <DepthVsMagnitudeChart />
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
          className="w-full h-[50vh] md:h-[60vh] rounded-lg overflow-hidden"
        />
        <Legend />
      </motion.div>
    </motion.div>
  );
}

export default MapPlay;
