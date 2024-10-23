import React, { useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import certificatesData from "../data/certificationsData";
import ThemeContext from "../Components/ThemeContext";

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("Courses");
  const { theme } = useContext(ThemeContext); // Access theme context
  const certRef = useRef(null); // Reference for the certifications section
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

    const currentRef = certRef.current;
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
    <section
      ref={certRef} // Attach ref to the main section
      id="certi"
      className={`md:mt-16 mt-8 md:px-8 px-4 ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      <div className="mb-8 text-left">
        {/* Fade in up for title and hr */}
        <motion.h2
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
          variants={variants}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold outfit"
        >
          Certifications
        </motion.h2>
        <motion.hr
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
          variants={variants}
          transition={{ duration: 0.5 }}
          className={`border-t-4 w-24 my-2 ${theme === "dark" ? "border-white" : "border-black"}`}
        />
      </div>

      {/* Categories Navbar with Animation */}
      <div className="flex justify-center items-center mb-8 inter">
        <div className={`flex w-[90%] rounded-2xl shadow-lg p-3 space-x-8 justify-evenly overflow-x-auto ${theme === "dark" ? "border-gray-600 shadow-white shadow-md" : "shadow-gray-300 shadow-md"}`}>
          {Object.keys(certificatesData).map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300
                  ${
                    activeCategory === category
                      ? "bg-blue-800 text-white p-3 md:rounded-full rounded-2xl"
                      : `${theme === "dark" ? "text-white hover:text-gray-400" : "text-black hover:text-gray-600"}`
                  }
                `}
            >
              <span className="md:text-lg text-sm font-semibold">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtered Certificates with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 montserrat">
        {certificatesData[activeCategory].map((cert, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }} // Staggered delay
            className={`border ${theme === "dark" ? "border-gray-700 shadow-white shadow-sm" : "border-gray-300 shadow-black shadow-sm"} p-4 rounded-lg`}
          >
            <h4 className="text-xl font-semibold">{cert.title}</h4>
            <p className="text-md">{cert.institution}</p>
            <p className="text-sm text-gray-500">{cert.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
