import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion"; // Import motion for animation

const Hero = () => {
  const typedRef = useRef(null);
  const sectionRef = useRef(null); // Reference for intersection observer
  const [inView, setInView] = useState(false); // Track if section is visible

  useEffect(() => {
    // Initialize typed.js
    const options = {
      strings: ["Developer", "Frontend Developer", "App Developer"],
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 1500,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy(); // Cleanup Typed instance on unmount
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Set inView to true when visible
          } else {
            setInView(false); // Reset when out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Start with reduced size and opacity
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef} // Attach ref to section for intersection observer
      className="h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden mt-14"
    >
      {/* Wrapper Div */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Video Element */}
        <motion.div className="flex items-center justify-center w-full h-full"  initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate based on visibility
          variants={popupVariants}>
          <video
            className="w-full h-full object-cover rounded-xl"
            autoPlay
            loop
            muted
          >
            <source src="/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          className="absolute backdrop-blur-sm bg-black/50 z-10 shadow-xl rounded-xl flex flex-col items-center justify-center p-6 w-full h-full"
          initial="hidden"
          animate={inView ? "visible" : "hidden"} // Animate based on visibility
          variants={popupVariants}
        >
          <h1 className="text-4xl font-bold outfit text-white">Himanshu Chopade</h1>
          <p className="text-xl mt-4 inter text-white">
            <span className="typed" ref={typedRef} />
            <span
              className="typed-cursor typed-cursor--blink"
              aria-hidden="true"
            ></span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
