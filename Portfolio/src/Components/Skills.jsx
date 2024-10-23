import React, { useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import skills from "../data/skillsData";
import ThemeContext from "./ThemeContext";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Coding");
  const { theme } = useContext(ThemeContext);
  const skillsRef = useRef(null); // Reference for the skills section
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visible to true when in view
          } else {
            setIsVisible(false); // Optional: set it back to false if not in view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 10% of the section is visible
    );

    const currentRef = skillsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={skillsRef} // Attach ref to the main div
      className={`mt-12 ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      {/* Fade in up for title and hr */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-left mb-4 outfit">Skills</h3>
        <hr className={`border-t-4 w-24 my-2 ${theme === "dark" ? "border-white" : "border-black"}`} />
      </motion.div>

      {/* Fade in up for Skills Category Navbar */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-center items-center mt-6 inter">
          <div className={`flex w-[90%] rounded-2xl shadow-lg p-3 space-x-8 justify-evenly overflow-x-auto px-2 md:px-0 ${theme === "dark" ? "border-gray-700 shadow-white shadow-md" : "shadow-gray-300 shadow-md"}`}>
            {Object.keys(skills).map((category) => (
              <div
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300
                    ${activeCategory === category ? "bg-blue-800 text-white p-3 md:rounded-full rounded-2xl" : "hover:text-gray-400"}
                  `}
              >
                <span className={`md:text-lg text-sm font-semibold`}>
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Fade in up for Skills Display with staggered animation */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 montserrat">
        {skills[activeCategory].map((skill, index) => (
          <motion.div
            key={skill.name}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }} // Staggered delay
            className="flex items-center"
          >
            <span className="w-1/4 text-lg font-medium">{skill.name}</span>
            <div className="w-3/4 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <span className="text-sm">{skill.progress}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
