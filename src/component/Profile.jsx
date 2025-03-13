import React from "react";
import { motion } from "framer-motion";

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
    "GIS",
    "Web Development",
    "Spatial Data Processing",
    "Geospatial Analysis",
    "PostGIS",
    "Turf.js",
    "Magellan",
    "Laravel",
    "Inertia.js",
    "React",
    "PostGIS",
    "JavaScript",
    "React Native (Expo, EAS)",
    "Leaflet.js",
    "Context API",
    "Secure API Development",
    "High-Performance Backend",
    "Web Mapping",
    "QGIS",
    "Spatial SQL",
    "JavaScript DOM Manipulation",
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
      className="w-full h-full flex flex-col bg-white text-black text-lg shadow-lg rounded-lg overflow-hidden"
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
          className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <img
            src="/path-to-your-avatar.jpg"
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
          <h2 className="font-semibold text-yellow-400">WebGIS Developer</h2>
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
          <h2 className="font-semibold text-yellow-400">ABOUT ME</h2>
          <p className="mt-2 text-black-300">
            🚀 GIS & Web Developer specializing in spatial data processing, web
            mapping, and geospatial analysis. Skilled in PostGIS, Turf.js, and
            Magellan for efficient web-based spatial data processing. I build
            dynamic applications using Laravel, Inertia.js, React, and
            JavaScript, while leveraging React Native (Expo, EAS) for mobile
            development. Experienced in Leaflet.js, Pegman, and Context API to
            create highly interactive maps. On the backend, I work with PHP & Go
            to develop secure, high-performance APIs. Passionate about
            transforming complex geospatial data into actionable insights! 🌍
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="w-full text-center"
          initial="hidden"
          animate="visible"
          variants={skillContainerVariants}
        >
          <h2 className="font-semibold text-yellow-400 mb-4">SKILLS SET</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium"
                variants={skillVariants}
                whileHover={{ scale: 1.1, backgroundColor: "#f59e0b" }}
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
