import React from 'react'; // Added React import
import { motion } from "framer-motion";

// Updated props to match the new design
interface ProjectCardProps {
  imageUrl: string;
  title: string;
  onClick?: () => void; // Keep onClick optional if modal functionality might be added later
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }} // Slightly reduced scale for subtlety
      whileTap={{ scale: 0.97 }} // Slightly reduced scale for subtlety
      className="min-w-[250px] md:min-w-[300px] lg:min-w-[350px] h-[450px] rounded-2xl overflow-hidden relative cursor-pointer shadow-lg border border-white/10" // Adjusted size slightly, added border
      onClick={onClick} // Attach onClick handler
      style={{ transformOrigin: 'center center' }} // Ensure scaling is centered
    >
      <img
        src={imageUrl}
        alt={title}
        onError={(e) => { // Added image error handling
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/project/default-placeholder.jpg'; // Use placeholder
        }}
        className="w-full h-full object-cover"
      />
      {/* Overlay shown on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
        <h2 className="text-white text-xl md:text-2xl font-semibold text-center">{title}</h2>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
