import React, { useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Contactinfo from "../Components/Contactinfo";
import ContactForm from "../Components/ContactForm";
import ThemeContext from "../Components/ThemeContext"; // Import ThemeContext

const Contact = () => {
  const { theme } = useContext(ThemeContext); // Access theme context
  const sectionRef = useRef(null); // Reference for the section
  const [isVisible, setIsVisible] = React.useState(false); // State to control visibility

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

    const currentRef = sectionRef.current;
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
      id="contact"
      ref={sectionRef} // Attach ref to the section
      className={`md:mt-16 mt-8 md:px-8 px-4 ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-left">
          <h2 className="text-3xl font-bold outfit">Let's Connect</h2>
          {/* Dynamic underline color */}
          <hr className={`border-t-4 w-24 my-2 ${theme === "dark" ? "border-white" : "border-black"}`} />
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Div - Description & Social Links */}
          <Contactinfo theme={theme} /> {/* Pass the theme prop to Contactinfo */}

          {/* Right Div - Contact Form Placeholder */}
          <ContactForm theme={theme} /> {/* Pass the theme prop to ContactForm */}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
