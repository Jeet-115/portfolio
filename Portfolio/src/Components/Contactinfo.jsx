import React, { useContext, useRef, useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeContext from "./ThemeContext"; // Import ThemeContext

const ContactInfo = () => {
  const { theme } = useContext(ThemeContext); // Access theme context
  const contactRef = useRef(null); // Reference for the contact section
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

    const currentRef = contactRef.current;
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
      ref={contactRef} // Attach ref to the main section
      className={`md:w-1/2 space-y-6 inter ${theme === "dark" ? "text-white" : "text-black"}`}
    >
      <motion.p
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
        variants={variants}
        transition={{ duration: 0.5 }}
        className="text-lg"
      >
        Feel free to connect with me through my social media profiles or drop me
        an email. I am always open to new opportunities, collaborations, or just
        a friendly chat!
      </motion.p>

      <div className="flex space-x-6 text-2xl">
        {[
          { href: "https://linkedin.com/in/jeet-mistry-67a613233", icon: <FaLinkedin />, color: theme === "dark" ? "text-blue-400" : "text-blue-500" },
          { href: "https://github.com/Jeet-115", icon: <FaGithub />, color: theme === "dark" ? "text-gray-400" : "text-gray-800" },
          { href: "https://x.com/@Jeet43959691", icon: <img src="/twitter.png" alt="Twitter X" className="h-[1em] w-[1em]" />, color: "" },
          { href: "mailto:jeetmistry115@gmail.com", icon: <FaEnvelope />, color: theme === "dark" ? "text-red-400" : "text-red-500" },
          { href: "https://www.instagram.com/jeet_.115/", icon: <FaInstagram />, color: "text-pink-500" },
          { href: "https://facebook.com/jeet.mistry.7543/", icon: <FaFacebook />, color: "text-blue-600" },
        ].map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:transition-all ${link.color} hover:${link.color ? link.color.replace('text-', 'hover:text-') : ''}`}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
            variants={variants}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} // Staggered delay
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
