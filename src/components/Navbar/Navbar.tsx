import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

const navContainerVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hidden: { opacity: 0, y: -100, transition: { duration: 0.3 } } // Added hidden state
};

const navItemVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navItems = ['Home', 'About', 'Projects', 'Pricing'];
  const { playSound: playClickSound } = useSound('uiClick', { volume: 0.5 });

  const handleNavClick = () => {
    playClickSound();
  };

  // Effect to handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down and scrolled past initial header area (e.g., 100px)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) { // Show if scrolling up
        setIsVisible(true);
      }
      // Always show navbar if at the very top of the page
      if (currentScrollY === 0) {
          setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Dependency array includes lastScrollY

  return (
    <motion.nav
      className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none"
      // Animate based on isVisible state
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={navContainerVariants}
    >
      {/* Navigation container with horizontal scroll and hidden scrollbar */} 
      <div 
        className="navbar-scrolling-container flex flex-row items-center bg-black/30 backdrop-blur-md rounded-full pointer-events-auto border border-white/10 shadow-lg 
                   px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-2 
                   gap-4 sm:gap-6 md:gap-8
                   w-[calc(100%-2rem)] max-w-full md:w-auto md:max-w-lg lg:max-w-none mx-4\ Adjust width to be wider on mobile with horizontal margin
                   "
      >
        {navItems.map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={handleNavClick}
            className="nav-link text-sm text-neutral-200 hover:text-white transition-colors duration-200 flex-shrink-0" // flex-shrink-0 to prevent shrinking
            variants={navItemVariants}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
        {/* Contact Us button - part of the scrolling container */} 
        <motion.a
          href="#contact"
          onClick={handleNavClick}
          className="nav-link text-sm text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex-shrink-0" // flex-shrink-0 to prevent shrinking
          variants={navItemVariants}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
