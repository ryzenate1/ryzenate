import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLink, FaGithub } from 'react-icons/fa';
import { Project } from '../types/project'; // Corrected import path

interface ExpandedProjectViewProps {
  project: Project | null;
  onClose: () => void;
  layoutId: string;
}

const ExpandedProjectView: React.FC<ExpandedProjectViewProps> = ({ project, onClose, layoutId }) => {

  // Define variants within the component scope
  const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
        {project && (
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose} 
            >
                <motion.div
                    layoutId={layoutId} 
                    className="glass-container rounded-xl w-full max-w-3xl h-auto max-h-[90vh] p-6 md:p-8 relative flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()} 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                >
                    {/* Close button defined directly */}
                    <button 
                      onClick={onClose} 
                      className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors z-10 p-1 bg-neutral-800/50 rounded-full"
                      aria-label="Close project details"
                    >
                      <FaTimes size={20} />
                    </button>

                    {/* Content */}
                    <motion.img 
                      layoutId={`image-${layoutId}`} 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 flex-shrink-0" 
                    />
                    <div className="flex-grow overflow-y-auto pr-2">
                        <motion.h2 
                          layoutId={`title-${layoutId}`} 
                          className="text-2xl md:text-3xl font-semibold text-neutral-100 mb-2"
                        >
                            {project.title}
                         </motion.h2>
                        <motion.div 
                           layoutId={`tags-${layoutId}`} 
                           className="flex flex-wrap gap-2 mb-4"
                         >
                           {project.tech.map((tech: string) => ( // Added type annotation
                             <span key={tech} className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">{tech}</span>
                           ))}
                         </motion.div>
                        <p className="text-sm md:text-base text-neutral-300 mb-6 leading-relaxed">
                            {project.description} 
                        </p>
                    </div>
                    {/* Links section */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 0.3 }}
                        className="flex justify-end items-center gap-4 mt-auto pt-4 border-t border-neutral-700/50 flex-shrink-0"
                        >
                        {project.liveUrl && project.liveUrl !== "#" && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo/Site" className="text-neutral-400 hover:text-blue-400 transition-colors">
                            <FaLink size={20} />
                            </a>
                        )}
                        {project.repoUrl && project.repoUrl !== "#" && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" title="GitHub Repo" className="text-neutral-400 hover:text-white transition-colors">
                            <FaGithub size={20} />
                            </a>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  );
};

export default ExpandedProjectView;