import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Profile from "./component/Profile";
import MapPlay from "./component/MapPlay";
import MapOverlay from "./component/MapOverlay";
import "./App.css";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function getComponentById(id, activeId) {
  const components = {
    1: Profile,
    2: MapPlay,
    3: MapOverlay,
  };

  const SelectedComponent = components[id] || Profile;

  if (id === activeId) {
    return (
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SelectedComponent id={id} />
      </motion.div>
    );
  }

  return null;
}

function NumberDisplay({ id, activeId }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 100);

  return (
    <section className="h-screen w-full snap-center flex justify-center items-center p-0 m-0">
      <div ref={ref} className="w-full flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full flex justify-center items-center"
          style={{ y, width: "100%" }}
        >
          {getComponentById(id, activeId)}
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const newActiveId = Math.round(scrollPosition / sectionHeight) + 1;
      setActiveId(newActiveId);
      console.log("Active ID:", newActiveId); // Debugging log
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="example"
      className="relative w-full bg-gradient-to-br from-gray-900 to-blue-800 shadow-xl rounded-xl"
    >
      {[1, 2, 3].map((id) => (
        <NumberDisplay key={id} id={id} activeId={activeId} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>{`
        html {
            scroll-snap-type: y mandatory;
        }

        .progress {
            position: fixed;
            left: 0;
            right: 0;
            border-radius:4px;
            height: 8px;
            background:rgb(40, 43, 101);
            bottom: 50px;
            transform: scaleX(0);
        }
    `}</style>
  );
}
