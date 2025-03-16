import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Header({ activeId }) {
  const pageNames = {
    1: "About Me",
    2: "Interactive Data Visualizations",
    3: "Spatial Analysis & Dynamic Mapping",
    4: "Project: Webmap PBB P-2",
    5: "Project: Survey Pajak Kendaraan Bermotor",
  };

  const pageName = pageNames[activeId] || "Profile";
  const nextPageId = activeId + 1;
  const nextPageName = pageNames[nextPageId] || "End"; // Default to "End" if there's no next page

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.3, duration: 0.5, ease: "easeOut" },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-gray-200 to-white text-[#00BFFF] p-4 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        style={{ color: "#00BFFF" }} // Siren-like blue color
      >
        <motion.div className="flex items-center gap-3" variants={textVariants}>
          <h6 className="text-2xl font-semibold tracking-tight">{pageName}</h6>
        </motion.div>
      </motion.header>

      {/* Footer */}
      <motion.footer
        className="fixed bottom-0 left-0 right-0 bg-white text-[#00BFFF] p-4 z-50 shadow-lg flex justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={footerVariants}
      >
        <motion.p
          className="text-md flex items-center gap-2 font-medium"
          variants={textVariants}
          style={{ color: "#00BFFF" }} // Siren-like blue color
        >
          <span>{nextPageName}</span>
          {nextPageName !== "End" && (
            <FontAwesomeIcon icon={faArrowDown} className="animate-bounce" />
          )}
        </motion.p>
      </motion.footer>
    </>
  );
}
