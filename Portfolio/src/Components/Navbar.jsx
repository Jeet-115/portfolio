import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa"; // Icons for hamburger and close
import { Link } from "react-scroll";
import ThemeContext from './ThemeContext';
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu toggle
  
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  // Toggle between dark and light themes
  
  const [underlineWidths, setUnderlineWidths] = useState({
    hero: 0,
    aboutme: 0,
    projects: 0,
    resume: 0,
    certi: 0,
    contact: 0,
  });

  const navItems = [
    { name: "Home", href: "hero" },
    { name: "About Me", href: "aboutme" },
    { name: "Certifications", href: "certi" },
    { name: "Projects", href: "projects" },,
    { name: "Contact", href: "contact" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;

          if (entry.isIntersecting) {
            // Set the width to 100% for the active section
            setUnderlineWidths((prev) => ({ ...prev, [sectionId]: 100 }));
          } else {
            // Set the width back to 0 for the inactive section
            setUnderlineWidths((prev) => ({ ...prev, [sectionId]: 0 }));
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Define motion variants for the mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`bg-${theme === "dark" ? "black" : "white"} text-${theme === "dark" ? "white" : "black"} px-12 py-4 shadow-md fixed w-full z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Title */}
        <div className="text-2xl font-bold">Portfolio</div>

        {/* Right: Links for Laptop Screens */}
        <ul className="hidden md:flex space-x-8 relative">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              <Link
                to={item.href}
                smooth={true}
                duration={1000}
                className="hover:text-gray-400 cursor-pointer"
              >
                {item.name}
              </Link>
              {/* Underline with dynamic width */}
              <div
                className={`"absolute h-1 ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-all duration-300`}
                style={{
                  width: `${underlineWidths[item.href]}%`,
                  bottom: -5,
                }}
              />
            </li>
          ))}
        </ul>
        {/* Theme Switch */}
        <div className="flex">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Hamburger Icon for Mobile/Tablet */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          transition={{ duration: 0.5 }}
          className="md:hidden mt-4 space-y-4 text-center"
        >
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-gray-400 cursor-pointer">
              <Link
                to={item.href}
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default Navbar;
