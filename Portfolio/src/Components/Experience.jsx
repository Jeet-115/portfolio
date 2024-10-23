import React, { useContext, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import experiences from "../data/experienceData";
import ThemeContext from "./ThemeContext";

const Experience = () => {
  const { theme } = useContext(ThemeContext);
  const experienceRef = useRef(null); // Reference for the experience section
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

    const currentRef = experienceRef.current;
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
      ref={experienceRef} // Attach ref to the main div
      className={`mt-12 ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      {/* Fade in up for title and hr */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-left mb-4 outfit">Experience</h3>
        <hr className={`border-t-4 w-24 my-2 mb-8 ${theme === "dark" ? "border-white" : "border-black"}`} />
      </motion.div>

      <div className="flex flex-wrap md:justify-evenly">
        {/* Experience List with staggered animation */}
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }} // Staggered delay
            className="mb-6 w-full md:w-1/3 px-2 space-y-2"
          >
            <h4 className="text-xl font-semibold inter">{experience.title}</h4>
            <p className="text-md font-medium inter">{experience.company}</p>
            <ul className="pl-5 mt-2 space-y-2 montserrat">
              {experience.points.map((point, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="mr-2">👉</span> {/* Emoji */}
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
