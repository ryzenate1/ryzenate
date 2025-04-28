"use client";
import { useRef, useEffect } from "react"; // Import useEffect
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from '../Common/SectionTitle'; // Import SectionTitle

const projects = [
  {
    title: "Caroline Seiffert",
    imageUrl: "/projects/project_1.png",
    link: "https://www.lokkeestudios.com/project/carolineseiffert",
  },
  {
    title: "Little Ashé",
    imageUrl: "/projects/project_2.png", 
    link: "https://www.lokkeestudios.com/project/little-ashe",
  },
  {
    title: "Contentary",
    imageUrl: "/projects/project_3.png", 
    link: "https://www.lokkeestudios.com/project/contentary",
  },
  {
    title: "Nullpunkt",
    imageUrl: "/projects/project_4.png", 
    link: "https://www.lokkeestudios.com/project/nullpunkt",
  },
  {
    title: "Weatherworks", 
    imageUrl: "https://www.lokkeestudios.com/_next/image?url=%2Fassets%2Fweatherworks.webp&w=1920&q=75",
    link: "https://www.lokkeestudios.com/project/weatherworks",
  },
  {
    title: "Lockey", 
    imageUrl: "https://www.lokkeestudios.com/_next/image?url=%2Fassets%2Flockey.webp&w=1920&q=75",
    link: "https://www.lokkeestudios.com/project/lockey",
  },
];

interface ProjectsSectionProps {
  id: string;
  onContentReady?: () => void;
}

// Accept onContentReady prop
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id, onContentReady }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Call onContentReady after the component mounts with increased delay
  useEffect(() => {
    if (onContentReady) {
      // Increased delay to allow images/content to load and layout to settle
      const timeoutId = setTimeout(() => {
        onContentReady();
      }, 2000); // Increased delay to 2000ms
      return () => clearTimeout(timeoutId);
    }
  }, [onContentReady]); // Rerun if onContentReady function changes

  // Function to smoothly scroll the container
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Calculate scroll amount based on card width and gap
      // Assuming average card width + gap for a better scroll step
      const cardWidth = scrollRef.current.querySelector('.snap-center')?.clientWidth || 300; // Fallback width
      const gap = parseInt(getComputedStyle(scrollRef.current).gap) || 20; // Fallback gap
      const scrollAmount = cardWidth + gap;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if arrows should be disabled (basic implementation)
  // More advanced logic would involve checking scroll position

  return (
    <section id={id} className="bg-[#0A0A23] py-16 md:py-20 relative overflow-hidden" data-scroll-section>
      {/* Section Title Component */}
      <SectionTitle 
        label="PROJECTS"
        title="Work Showcase"
        subtitle="Check out our sample work with lokkee studios"
      />

      {/* Arrows for horizontal scrolling navigation */}
      <button
        aria-label="Scroll projects left"
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-20 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => scroll("left")}
      >
        <FaArrowLeft size={18} />
      </button>
      <button
        aria-label="Scroll projects right"
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg z-20 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => scroll("right")}
      >
        <FaArrowRight size={18} />
      </button>

      {/* Scrollable container for project cards */}
      {/* Uses flex and overflow-x-auto for horizontal scrolling */}
      {/* snap-x for aligning cards after scroll */}
      {/* px-4 for small screens, increasing on larger */}
      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-8 md:px-16 pb-4"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }} // Removed temporary styles
      >
        {/* Map through projects to create scrollable cards */}
        {projects.map((project, index) => (
          <motion.a 
            key={project.title + index} // Unique key including index
            href={project.link}
            target="_blank" // Open link in new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            // Responsive width: smaller on mobile, larger on desktop, fixed on xl
            className="snap-center flex-shrink-0 w-[85vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] xl:w-[400px] h-[55vh] sm:h-[65vh] md:h-[75vh] rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10"
            // Framer Motion for fade-in and slide-up on view, and hover effect
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% in view
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.08, // Stagger animation
            }}
            whileHover={{ y: -8 }} // More pronounced hover lift
          >
            {/* Project Image - Added initial scale and adjusted hover scale */}
            <img
              src={project.imageUrl}
              alt={project.title}
              // Handle image load errors gracefully
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop if fallback also fails
                target.src = '/projects/default-placeholder.jpg'; // Fallback image
              }}
              // Added scale-105 to ensure image slightly overfills container initially
              // Increased group-hover scale to 115 for a more noticeable zoom
              className="absolute inset-0 object-cover object-center w-full h-full scale-105 group-hover:scale-115 transition-transform duration-500 ease-in-out"
            />
            {/* Overlay with Project Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
              <h3 className="text-white text-xl md:text-2xl font-semibold text-center mb-2">
                {project.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
