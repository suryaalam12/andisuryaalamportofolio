import React from "react";
import { motion } from "framer-motion";
import pp from "../assets/pp.png";

export default function Profile() {
  const sentence = "Andi Surya Alam".split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const skills = [
    // Core GIS Skills
    "GIS",
    "Geospatial Analysis",
    "Spatial Data Processing",
    "Web Mapping",
    "PostGIS",
    "QGIS",

    "TailWind",

    // Backend Development
    "Go-lang",
    "Laravel",

    // Web Development & Frontend
    "Web Development",
    "JavaScript",
    "JavaScript DOM Manipulation",
    "React",
    "Inertia.js",

    // Mobile Development
    "React Native (Expo, EAS)",
  ];

  const skillContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col bg-gradient-to-b from-white via-gray-300 to-white text-black text-lg shadow-2xl rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {/* Top Section: Avatar, Name, and Title */}
      <motion.div
        className="w-full flex flex-col items-center justify-center p-8 border-b border-gray-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* Avatar */}
        <motion.div
          style={{ width: "200px", height: "200px", overflow: "hidden" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <img
            src={pp}
            alt="Your Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated Sentence */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center"
        >
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

        {/* Title */}
        <motion.div
          className="mt-6 text-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-blue-600">WebGIS Developer</h2>
        </motion.div>
      </motion.div>

      {/* Bottom Section: About Me and Skills */}
      <motion.div
        className="w-full flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* About Me Section */}
        <motion.div
          className="text-lg text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-blue-600">ABOUT ME</h2>
          <p className="mt-2 text-black-300">
            🚀 GIS & Web Developer specializing in spatial data processing, web
            mapping, and geospatial analysis. Skilled in PostGIS and Turf.js for
            efficient web-based spatial data processing. I build dynamic
            applications using Laravel, Inertia.js, React, and JavaScript, while
            leveraging React Native (Expo, EAS) for mobile development.
            Experienced in Leaflet.js, Mapbox and Context API to create highly
            interactive maps. On the backend, I work with PHP and Go to develop
            secure, high-performance APIs. Passionate about transforming complex
            geospatial data into actionable insights! 🌍
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="w-full text-center"
          initial="hidden"
          animate="visible"
          variants={skillContainerVariants}
        >
          <h2 className="font-semibold text-blue-600 mb-4">SKILLS SET</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium"
                variants={skillVariants}
                whileHover={{ scale: 1.1, backgroundColor: "#00BFFF" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
