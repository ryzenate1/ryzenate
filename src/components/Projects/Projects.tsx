'use client';

import { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from '../Common/SectionTitle';

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

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id, onContentReady }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onContentReady) {
      const timeoutId = setTimeout(() => {
        onContentReady();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [onContentReady]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.querySelector('.snap-center') as HTMLElement;
    const cardWidth = card?.clientWidth ?? 300;
    const gap = parseInt(getComputedStyle(scrollRef.current).gap) || 20;
    const scrollAmount = cardWidth + gap;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="bg-[#0A0A23] py-16 md:py-20 relative overflow-hidden" data-scroll-section>
      <SectionTitle 
        label="PROJECTS"
        title="Work Showcase"
        subtitle="Check out our sample work with lokkee studios"
      />

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

      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-8 md:px-16 pb-4"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((project, index) => (
          <motion.a 
            key={project.title + index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-center flex-shrink-0 w-[85vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] xl:w-[400px] h-[55vh] sm:h-[65vh] md:h-[75vh] rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            whileHover={{ y: -8 }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/projects/default-placeholder.jpg';
              }}
              className="absolute inset-0 object-cover object-center w-full h-full scale-105 group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
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
