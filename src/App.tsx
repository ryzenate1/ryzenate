import React, { useState, useRef, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useSound } from './hooks/useSound';
import Konami from 'konami-code-js';
import { motion } from 'framer-motion';

// --- Context Imports ---
import { useCursor } from './context/CursorContext'; // Import useCursor

// --- Component Imports ---
import Bootloader from './components/Bootloader/Bootloader';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import VideoBackground from './components/Background/VideoBackground';
import ProjectsSection from './components/Projects/Projects';
import CustomCursor from './components/CustomCursor/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locoScrollRef = useRef<LocomotiveScroll | null>(null);
  // Get BOTH state and setter from useCursor
  const { isTargeted, targetRect, setCursorState } = useCursor(); 

  // Function to trigger Locomotive Scroll update
  const triggerScrollUpdate = () => {
    locoScrollRef.current?.update();
  };

  // --- Ambient Sound Management ---
  const { playSound, stopSound } = useSound('ambient', { volume: 0.1, loop: true });

  useEffect(() => {
    let ambientTimeout: NodeJS.Timeout | null = null;
    if (!isLoading) {
      ambientTimeout = setTimeout(() => playSound(), 500);
    } else {
      stopSound();
    };

    return () => {
      if (ambientTimeout) clearTimeout(ambientTimeout);
      stopSound();
    };
  }, [isLoading, playSound, stopSound]);

  // --- Locomotive Scroll Setup ---
  useEffect(() => {
    // Add safety check for cursorState
    if (!isLoading && scrollRef.current) {
      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.08,
      });

      const handleResize = () => locoScrollRef.current?.update();
      window.addEventListener('resize', handleResize);

      // --- Cursor Reset on Scroll (Refined & Safer) --- 
      const handleScroll = () => {
        // Check state again inside handler
        if (isTargeted) { 
          setCursorState({ isTargeted: false, targetRect: null });
        }
      };
      // locoScrollRef.current.on('scroll', handleScroll); // Commented out this line
      // -----------------------------------------

      // Keep MutationObserver as a fallback
      const observer = new MutationObserver(() => {
        locoScrollRef.current?.update();
      });

      if (scrollRef.current) {
        observer.observe(scrollRef.current, { childList: true, subtree: true });
      }

      const initialUpdateTimeout = setTimeout(() => {
          locoScrollRef.current?.update();
      }, 100);

      return () => {
        // Check if instance exists before removing listener
        // locoScrollRef.current?.off('scroll', handleScroll); // Commented out this line

        locoScrollRef.current?.destroy();
        window.removeEventListener('resize', handleResize);
        if (observer) observer.disconnect();
        if (initialUpdateTimeout) clearTimeout(initialUpdateTimeout);
        locoScrollRef.current = null;
      };
    }
  // Removed cursorState.isTargeted, added cursorState itself
  }, [isLoading, setCursorState, isTargeted]); 

  // --- Konami Code Activation ---
  useEffect(() => {
    new Konami(() => {
      alert('Konami Code Activated! Accessing hidden terminal...');
      console.log('Konami sequence detected! You found the secret.');
    });
  }, []);

  // --- Handle Boot Complete ---
  const handleBootComplete = () => setIsLoading(false);

  // --- Sections ---
  const footerSection = (
    <footer data-scroll-section className="py-8 text-center text-neutral-500 text-xs bg-[#0d1117] relative z-10">
      © {new Date().getFullYear()} Ryzen. All rights reserved.
    </footer>
  );

  return (
    <>
      <CustomCursor /> 
      {isLoading ? (
        <Bootloader onBootComplete={handleBootComplete} />
      ) : (
        <div className="font-sans opacity-100 transition-opacity duration-500 ease-in">
          <VideoBackground />
          <Navbar />
          {/* Main scroll container managed by Locomotive Scroll */}
          <div ref={scrollRef} data-scroll-container className="relative z-10 bg-transparent">
            {/* Render components directly */}
            {/* Components need to have data-scroll-section on their root element */} 
            <Landing id="home" />
            <About id="about" />
            <ProjectsSection id="projects" onContentReady={triggerScrollUpdate} />
            <Testimonials id="testimonials" onContentReady={triggerScrollUpdate} />
            <Pricing id="pricing" />
            <Contact id="contact" />
            {footerSection}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
