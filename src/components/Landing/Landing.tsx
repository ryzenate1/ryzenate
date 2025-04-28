'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.15 },
  }),
};

const letterVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 10, stiffness: 100 },
  },
};

interface LandingProps {
  id: string;
}

const Landing: React.FC<LandingProps> = ({ id }) => {
  const targetText = "Hello I'm Riyaz";
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCursorState } = useCursor();

  const fullStackRef = useRef<HTMLDivElement>(null);
  const developerRef = useRef<HTMLDivElement>(null);
  const engineerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < targetText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(targetText.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, targetText]);

  const handleMouseEnter = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setCursorState({ isTargeted: true, targetRect: rect });
    }
  };

  const handleMouseLeave = () => {
    setCursorState({ isTargeted: false, targetRect: null });
  };

  const titleH1Class =
    'font-extrabold tracking-tight uppercase leading-tight text-glow-white';

  return (
    <section
      id={id}
      className="relative w-full flex flex-col min-h-screen overflow-hidden p-6 sm:p-8 md:px-24 pt-36 sm:pt-40 text-white font-poppins"
      data-scroll-section
    >
      {/* Typing Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-4xl sm:text-3xl md:text-5xl font-mono text-left text-[#39FF14] mb-6 self-start whitespace-nowrap"
      >
        <div className="inline-flex items-center">
          {displayText}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop' }}
            className="terminal-cursor ml-1"
          >
            &nbsp;
          </motion.span>
        </div>
      </motion.div>

      {/* FULL-STACK */}
      <div
        ref={fullStackRef}
        onMouseEnter={() => handleMouseEnter(fullStackRef)}
        onMouseLeave={handleMouseLeave}
        className="relative self-center sm:self-start mt-2"
      >
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${titleH1Class} text-[54px] sm:text-6xl md:text-8xl text-center sm:text-left mb-2 whitespace-nowrap`}
        >
          {Array.from('FULL-STACK').map((letter, index) => (
            <motion.span key={index} variants={letterVariant} className="inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* DEVELOPER & */}
      <div
        ref={developerRef}
        onMouseEnter={() => handleMouseEnter(developerRef)}
        onMouseLeave={handleMouseLeave}
        className="relative self-center sm:self-start mt-2"
      >
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={1}
          className={`${titleH1Class} text-[54px] sm:text-6xl md:text-8xl text-center mb-2 whitespace-nowrap`}
        >
          {Array.from('DEVELOPER &').map((letter, index) => (
            <motion.span key={index} variants={letterVariant} className="inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* SOFTWARE and ENGINEER */}
      <div
        ref={engineerRef}
        onMouseEnter={() => handleMouseEnter(engineerRef)}
        onMouseLeave={handleMouseLeave}
        className="relative self-center sm:self-end mt-2"
      >
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={2}
          className={`${titleH1Class} text-[54px] sm:text-6xl md:text-8xl text-center sm:text-right pr-2`}
        >
          <div className="block sm:inline pl-2">
            {Array.from('SOFTWARE').map((letter, index) => (
              <motion.span key={`software-${index}`} variants={letterVariant} className="inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
          <div className="block sm:inline sm:ml-6 mt-1 sm:mt-0 pr-2">
            {Array.from('ENGINEER').map((letter, index) => (
              <motion.span key={`engineer-${index}`} variants={letterVariant} className="inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
        </motion.h1>
      </div>

      {/* Scroll Down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-muted text-2xl sm:text-3xl"
      >
        ↓
      </motion.div>
    </section>
  );
};

export default Landing;
