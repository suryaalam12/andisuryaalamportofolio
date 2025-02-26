import React from "react";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      className="w-full h-screen flex bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 
                 text-white text-lg shadow-lg rounded-lg overflow-hidden items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.div
        className="w-full flex flex-col items-center justify-center flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          Portofolio
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
