import React, { useEffect, useRef, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import Skills from "../Components/Skills";
import Experience from "../Components/Experience";
import ThemeContext from "../Components/ThemeContext";

const AboutMe = () => {
  const { theme } = useContext(ThemeContext); // Access theme context
  const controlsLeft = useAnimation(); // Left div animation controls
  const controlsRight = useAnimation(); // Right div animation controls
  const PRSfadeInRef = useRef(null); // Ref for intersection observer

  // Intersection Observer to detect visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger entrance animations
            if (entry.target.classList.contains("left-div")) {
              controlsLeft.start({ opacity: 1, x: 0 });
            } else if (entry.target.classList.contains("right-div")) {
              controlsRight.start({ opacity: 1, x: 0 });
            }
          } else {
            // Trigger exit animations when elements leave the screen
            if (entry.target.classList.contains("left-div")) {
              controlsLeft.start({ opacity: 0, x: -50 });
            } else if (entry.target.classList.contains("right-div")) {
              controlsRight.start({ opacity: 0, x: 50 });
            }
          }
        });
      },
      { threshold: 0.5 } // Adjust as needed
    );

    const element = PRSfadeInRef.current;
    if (element) {
      const leftDiv = element.querySelector(".left-div");
      const rightDiv = element.querySelector(".right-div");
      if (leftDiv) observer.observe(leftDiv);
      if (rightDiv) observer.observe(rightDiv);
    }

    return () => observer.disconnect(); // Cleanup
  }, [controlsLeft, controlsRight]);

  // Animation variants
  const slideInLeft = { opacity: 0, x: -50 };
  const slideInRight = { opacity: 0, x: 50 };

  return (
    <section
      id="aboutme"
      className={`md:mt-16 mt-8 md:px-8 px-4 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-bold outfit">About Me</h2>
        <hr
          className={`border-t-4 ${
            theme === "dark" ? "border-white" : "border-black"
          } w-24 my-2`}
        />
      </div>

      <div ref={PRSfadeInRef} className="flex flex-col md:flex-row">
        {/* Left Div: Profile Picture */}
        <motion.div
          className="w-full md:w-2/5 md:mb-0 left-div"
          initial={slideInLeft}
          animate={controlsLeft}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src="/pfp.jpg"
            alt="Profile"
            className={`w-40 md:w-60 h-40 md:h-60 object-cover rounded-xl ${
              theme === "dark"
                ? "shadow-gray-700 shadow-xl"
                : "shadow-gray-400 shadow-xl"
            }`}
          />
        </motion.div>

        {/* Right Div: Description */}
        <motion.div
          className="w-full md:w-3/5 right-div"
          initial={slideInRight}
          animate={controlsRight}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="mt-2 md:space-y-2 montserrat">
            <p>
              <strong className="inter">Name:</strong> Himanshu Chopade
            </p>
            <p>
              <strong className="inter">Email:</strong> himanshu@example.com
            </p>
            <p>
              <strong className="inter">Phone No:</strong> +1234567890
            </p>
            <p>
              <strong className="inter">Position:</strong> AI/ML Engineer
            </p>
          </div>
          <p className="mt-4 text-justify montserrat">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aut
            ea error incidunt, praesentium voluptatibus quae fugit tempore autem
            labore iste illum eum ab omnis? Dicta ea vitae tempora similique!
            Perferendis, dolorem! Sint repellat, expedita quibusdam iure itaque
            laudantium voluptates ut nobis laborum, iusto quos architecto quod
            consequuntur dolores ipsum rem omnis vitae! Nihil hic beatae, optio
            cumque distinctio dignissimos!
          </p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <Skills />
      {/* Experience Section */}
      <Experience />
    </section>
  );
};

export default AboutMe;
