import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import videoSrc2 from "../assets/gabung.mp4";
import videoSrc3 from "../assets/trans.mp4";

export default function UpdatingSpatial() {
  const videoRefs = useRef([]); // Array of refs for each video
  const scrollContainerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const skills = ["Go-Fiber", "PostGIS", "React Native (Expo, EAS)"];

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

  // Array of video sources
  const videoSources = [videoSrc2];

  const descriptions = [
    "Develop a React Native (Expo, EAS) application integrated with Go Fiber as the JSON and GeoJSON data provider (API), secured with JWT token authentication. Utilize Axios for real-time data synchronization, Mapbox for advanced mapping features, and geolocation for precise location tracking. This setup will enable efficient data collection and improved reporting capabilities.",
  ];

  const handleVideoEnd = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play();
    }

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: scrollContainer.clientWidth,
        behavior: "smooth",
      });
      setCurrentSection((prev) => (prev + 1) % descriptions.length);
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollLeft;
      const sectionWidth = scrollContainer.clientWidth;
      const sectionIndex = Math.round(scrollPosition / sectionWidth);
      if (sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);
      }
    }
  };

  useEffect(() => {
    const video = videoRefs.current[currentSection];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  }, [currentSection]);

  return (
    <motion.div
      className="h-1/2 w-[90vw] flex flex-col md:flex-row p-0 bg-white text-black text-lg shadow-2xl rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20, borderWidth: 0 }}
      animate={{ opacity: 1, y: 0, borderWidth: "2px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      }}
    >
      <motion.div
        className="w-full flex flex-col items-center justify-center p-3 border-b border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.div
          className="mt-0 text-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-blue-600">
            React Native & Go Fiber Integration for Geospatial Data Processing
          </h2>
        </motion.div>

        <motion.div
          className="text-lg text-left mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <p className="mt-2 text-black-700">{descriptions[currentSection]}</p>
        </motion.div>
        <motion.div
          className="w-full text-center"
          initial="hidden"
          animate="visible"
          variants={skillContainerVariants}
        >
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

      <motion.div
        className="w-full h-[700px] flex flex-col items-center justify-center p-1 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div
          ref={scrollContainerRef}
          className="w-full h-full gap-2 p-3 flex overflow-x-scroll snap-x snap-mandatory pr-[12%]"
          onScroll={handleScroll}
        >
          {/* Dynamically render video sections */}
          {videoSources.map((src, index) => (
            <motion.div
              key={index}
              className="scrollItem w-full h-full flex-shrink-0 snap-start flex items-center border-2 rounded-sm justify-center relative"
              initial={{ opacity: 0, x: index === 0 ? 0 : 100 }} // Initial animation
              animate={{ opacity: 1, x: 0 }} // Animate into view
              transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth transition
            >
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)} // Assign ref to each video
                autoPlay={index === currentSection} // Autoplay only the current video
                muted
                loop={index !== currentSection} // Loop all videos except the current one
                onEnded={() => handleVideoEnd(index)} // Handle video end
                className="w-full h-full object-cover absolute inset-0"
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay with Animation */}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
