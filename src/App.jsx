import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Profile from "./component/profile";
import Company from "./component/Company";
import Project from "./component/Project";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function getComponentById(id, activeId) {
  const components = {
    1: Profile,
    2: Profile,
    3: Company,
  };

  const SelectedComponent = components[id] || Profile;

  // Only render the component if it's active
  if (id === activeId) {
    return (
      <motion.div
        key={id} // Key ensures re-mounting
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
          style={{ y, width: "100%" }} // Explicitly set width to 100%
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="example" className="relative w-full ">
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
            height: 5px;
            background: #4ff0b7;
            bottom: 50px;
            transform: scaleX(0);
        }
    `}</style>
  );
}
