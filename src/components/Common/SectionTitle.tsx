import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ label, title, subtitle }) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16" // Consistent margin
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Use consistent viewport
      transition={{ duration: 0.6 }}
    >
      {/* Label Tag */}
      <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#1a2035]/50 backdrop-blur-sm border border-blue-400/30">
        <span className="text-xs uppercase tracking-wider font-medium text-blue-300">
          {label}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl md:text-5xl font-semibold mb-3 text-neutral-200 text-glow-white">
        {title}
      </h2>
      {/* Subtitle */}
      <p className="text-lg md:text-xl text-neutral-400 text-glow-white max-w-2xl mx-auto"> {/* Added max-width for longer subtitles */}
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
