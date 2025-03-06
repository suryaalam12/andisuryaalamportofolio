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
    "JavaScript",
    "React",
    "Node.js",
    "GIS",
    "Web Mapping",
    "Python",
    "PostgreSQL",
    "Leaflet",
    "Mapbox",
    "D3.js",
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
      className="w-full max-w-4xl flex bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-lg shadow-lg rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.div
        className="w-1/3 flex flex-col items-center justify-center p-8 border-r border-gray-600"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
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
        <motion.div
          className="mt-6 text-lg text-center"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-yellow-400">WebGIS Developer</h2>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-2/3 flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          Portfolio
        </motion.h1>

        <motion.div
          className="text-lg text-center mb-8"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-yellow-400">WORK EXPERIENCE</h2>
          <p className="mt-2 text-gray-300">
            Specializing in Geographic Information Systems and Web Development.
          </p>
        </motion.div>

        {/* Skill Set Section */}
        <motion.div
          className="w-full text-center"
          initial="hidden"
          animate="visible"
          variants={skillContainerVariants}
        >
          <h2 className="font-semibold text-yellow-400 mb-4">SKILLS</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-gray-600 rounded-full text-sm font-medium"
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
