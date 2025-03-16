import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import videoSrc2 from "../assets/gabung.mp4";
import videoSrc3 from "../assets/trans.mp4";
import videoSrc4 from "../assets/zone.mp4";
import videoSrc5 from "../assets/tematik_map.mp4";
import videoSrc6 from "../assets/add.mp4";

export default function ZonasiProject() {
  const videoRefs = useRef([]); // Array of refs for each video
  const scrollContainerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const skills = ["Laravel", "React JS", "Tailwind", "PostGIS"];

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
  const videoSources = [videoSrc4, videoSrc2, videoSrc3, videoSrc5, videoSrc6];

  const descriptions = [
    "Developed a spatial analysis tool using Turf.js to create user-defined buffer zones, retrieve intersecting feature IDs, and process data through a left join based on ST_Intersection. Visualized results dynamically on a map and integrated Recharts for in-depth data analysis, enhancing decision-making capabilities.",
    "Leveraged PostGIS to perform advanced geospatial operations, including splitting geometries using ST_Split, merging datasets with ST_Union, and analyzing intersections with ST_Intersection, ensuring precise and efficient data processing",
    "Utilized Turf.js to transform and analyze GeoJSON data, extracting intersecting feature IDs, dynamically rendering them on an interactive map, and saving updated datasets for seamless data management and visualization.",
    "Implemented a data integration pipeline to perform left joins on external datasets from other DBMS in this case is PG with Oracle, enabling customized responses to user queries. Enhanced feature symbology and integrated chart analysis tools for improved data interpretation and visualization.",
    "Integrated Google Street View into the platform to provide users with a real-world perspective, facilitating accurate assessments for tax policy evaluations and supporting data-driven decision-making processes.",
  ];

  const title = [
    "NJOP Zoning",
    "Updating Spatial Data",
    "Editing Spatial Data ",
    "Thematic Map",
    "Additional",
  ];

  const handleVideoEnd = (index) => {
    console.log(`Video ${index} ended`);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: scrollContainer.clientWidth,
        behavior: "smooth",
      });
      setCurrentSection((prev) => (prev + 1) % descriptions.length);
      setCurrentSection((prev) => (prev + 1) % title.length);
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollPosition = scrollContainer.scrollLeft;
      const sectionWidth = scrollContainer.clientWidth;
      const sectionIndex = Math.round(scrollPosition / sectionWidth);
      console.log(
        "Scroll Position:",
        scrollPosition,
        "Section Index:",
        sectionIndex
      );

      if (sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);
      }
    }
  };

  // Load and unload videos dynamically
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSection) {
          // Load and play the current video
          video.src = videoSources[index];
          video.load();
          video.play();
        } else if (index === currentSection + 1) {
          // Preload the next video
          video.src = videoSources[index];
          video.load();
        } else {
          // Unload other videos
          video.src = "";
          video.load();
        }
      }
    });
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
      {/* Top Section: Static Content */}
      <motion.div
        className="w-full flex flex-col items-center justify-center p-3 border-b border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* Title */}
        <motion.div
          className="mt-0 text-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <h2 className="font-semibold text-blue-600">
            Accurate Land Tax Valuation Through Geospatial Technology
          </h2>
        </motion.div>
        <motion.div
          className="text-lg text-left mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <p className="mt-2 text-black-700">{title[currentSection]}</p>
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

      {/* Horizontal Scrollable Section */}
      <motion.div
        className="w-full h-[700px] flex flex-col items-center justify-center p-1 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="w-full h-full gap-2 p-1 flex overflow-x-scroll snap-x snap-mandatory pr-[12%]"
          onScroll={handleScroll}
        >
          {/* Dynamically render video sections */}
          {videoSources.map((src, index) => (
            <motion.div
              key={index}
              className="scrollItem w-full h-full flex-shrink-0 snap-start flex items-center rounded-sm justify-center relative"
              initial={{ opacity: 0, x: index === 0 ? 0 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Video */}
              <motion.div
                key={index}
                className="scrollItem w-full h-full flex-shrink-0 snap-start flex items-center rounded-sm justify-center relative"
                initial={{ opacity: 0, x: index === 0 ? 0 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Video Container */}
                <div className="relative w-full h-full overflow-hidden border-2 rounded-lg aspect-video">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay={index === currentSection}
                    muted
                    loop={false}
                    onEnded={() => handleVideoEnd(index)}
                    className="w-full h-full absolute inset-0 object-content"
                  ></video>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
