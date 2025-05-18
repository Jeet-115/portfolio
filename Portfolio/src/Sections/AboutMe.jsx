import React, { useEffect, useRef, useContext } from "react";
import { Link } from "react-scroll";
import { motion, useAnimation } from "framer-motion";
import Skills from "../Components/Skills";
import Experience from "../Components/Experience";
import ThemeContext from "../Components/ThemeContext";

const AboutMe = () => {
  const { theme } = useContext(ThemeContext);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const PRSfadeInRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("left-div")) {
              controlsLeft.start({ opacity: 1, x: 0 });
            } else if (entry.target.classList.contains("right-div")) {
              controlsRight.start({ opacity: 1, x: 0 });
            }
          } else {
            if (entry.target.classList.contains("left-div")) {
              controlsLeft.start({ opacity: 0, x: -50 });
            } else if (entry.target.classList.contains("right-div")) {
              controlsRight.start({ opacity: 0, x: 50 });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = PRSfadeInRef.current;
    if (element) {
      const leftDiv = element.querySelector(".left-div");
      const rightDiv = element.querySelector(".right-div");
      if (leftDiv) observer.observe(leftDiv);
      if (rightDiv) observer.observe(rightDiv);
    }

    return () => observer.disconnect();
  }, [controlsLeft, controlsRight]);

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
              <strong className="inter">Name:</strong> Jeet Mistry
            </p>
            <p>
              <strong className="inter">Email:</strong> jeetmistry115@gmail.com
            </p>
            <p>
              <strong className="inter">Phone No:</strong> +91 97379 46657
            </p>
            <br />
          </div>

          <p className="mt-4 text-justify montserrat">
            I am an enthusiastic full-stack developer, passionate about learning
            and growing in the field of web development, with a particular focus
            on MERN stack technologies. Specializing in ReactJS, I have built
            numerous projects and websites, constantly improving my skills and
            expanding my knowledge. I'm now ready to take on new challenges and
            start freelancing, offering creative and efficient solutions to
            bring innovative ideas to life.
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <a href="/Jeet Mistry.pdf" target="_blank" rel="noopener noreferrer">
              <button
                className={`px-6 py-2 rounded-md text-lg font-semibold ${
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-900 border-2 border-white"
                    : "text-black bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-200 border-2 border-black"
                } transition duration-300`}
              >
                Resume
              </button>
            </a>
            <Link to="contact" smooth={true} duration={1000}>
              <button
                className={`px-6 py-2 rounded-md text-lg font-semibold ${
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-900 border-2 border-white"
                    : "text-black bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-200 border-2 border-black"
                } transition duration-300`}
              >
                Hire Me
              </button>
            </Link>
          </div>
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
