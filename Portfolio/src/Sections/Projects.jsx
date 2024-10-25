import React, { useState, useContext, useRef, useEffect } from "react";
import { FaCode, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import projectsData from "../data/projectsData";
import ThemeContext from "../Components/ThemeContext"; // Import ThemeContext

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Websites");
  const { theme } = useContext(ThemeContext); // Access theme context
  const projRef = useRef(null); // Reference for the projects section
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
      { threshold: 0.2 } // Trigger when 10% of the section is visible
    );

    const currentRef = projRef.current;
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
      ref={projRef} // Attach ref to the main section
      id="projects"
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
          Projects
        </motion.h2>
        <motion.hr
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
          variants={variants}
          transition={{ duration: 0.5 }}
          className={`border-t-4 w-24 my-2 ${theme === "dark" ? "border-white" : "border-black"}`}
        />
      </div>

      {/* Categories Navbar */}
      <div className="flex justify-center items-center mb-8 inter">
        <div className={`flex w-[90%] rounded-2xl shadow-lg p-3 space-x-8 justify-evenly overflow-x-auto ${theme === "dark" ? "border-gray-600 shadow-white shadow-md" : "shadow-gray-300 shadow-md"}`}>
          {Object.keys(projectsData).map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-blue-800 text-white p-3 md:rounded-full rounded-2xl"
                    : `${theme === "dark" ? "text-white hover:text-gray-400" : "text-black hover:text-gray-600"}`
                }`}
            >
              <span className="md:text-lg text-sm font-semibold">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtered Projects with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 montserrat">
        {projectsData[activeCategory].map((project, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }} // Staggered delay
            className={`border ${theme === "dark" ? "border-gray-700 shadow-white shadow-md" : "border-gray-300 shadow-black shadow-md"} rounded-lg overflow-hidden`}
          >
            {/* Image with Hover/Click Effect */}
            <div className="relative group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center 
                  justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl hover:text-gray-300"
                >
                  <FaCode />
                </a>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-2xl hover:text-gray-300"
                >
                  <FaEye />
                </a>
              </div>
            </div>

            {/* Project Details */}
            <div className={`p-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              <h4 className="text-xl font-semibold">{project.title}</h4>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;