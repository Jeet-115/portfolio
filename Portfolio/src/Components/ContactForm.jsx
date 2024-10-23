import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeContext from "../Components/ThemeContext"; // Import ThemeContext

const ContactForm = () => {
  const [result, setResult] = useState("");
  const { theme } = useContext(ThemeContext); // Access theme context
  const formRef = useRef(null); // Reference for the form section
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

    const currentRef = formRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "cdb85d12-966f-4ffd-b08c-3aa4f85393b6"); // Replace with your actual access key

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.error("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div
      ref={formRef} // Attach ref to the form section
      className={`md:w-1/2 p-6 rounded-lg shadow-md montserrat ${theme === "dark" ? "shadow-2xl shadow-white text-white" : "shadow-2xl shadow-black text-black"}`}
    >
      <motion.form onSubmit={onSubmit} className="space-y-4" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.5 }}>
        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.5 }}>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-transparent text-white border-gray-600" : "bg-transparent border-gray-300"}`}
          />
        </motion.div>

        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.5, delay: 0.1 }}>
          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="helloWorld@email.com"
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-transparent text-white border-gray-600" : "bg-transparent border-gray-300"}`}
          />
        </motion.div>

        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.5, delay: 0.2 }}>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Just saying hi"
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-transparent text-white border-gray-600" : "bg-transparent border-gray-300"}`}
          />
        </motion.div>

        <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.5, delay: 0.3 }}>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Let's talk about..."
            required
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-transparent text-white border-gray-600" : "bg-transparent border-gray-300"}`}
          ></textarea>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
          variants={variants}
          transition={{ duration: 0.5, delay: 0.4 }} // Staggered delay
        >
          Send Message
        </motion.button>

        <motion.span
          className={`block text-center mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 }} // Staggered delay
        >
          {result}
        </motion.span>
      </motion.form>
    </div>
  );
}

export default ContactForm;
