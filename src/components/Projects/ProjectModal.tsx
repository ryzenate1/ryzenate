import React from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

// Re-use the Project type definition
type Project = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  description?: string;
  githubUrl?: string;
  liveUrl?: string;
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[9999] p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onClick={onClose} // Close when clicking backdrop
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        className="bg-[#1a1f2a] rounded-lg shadow-xl max-w-2xl w-full overflow-hidden relative border border-white/10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="max-h-[80vh] overflow-y-auto">
          <img
            src={project.image}
            alt={`Full view of ${project.title}`}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/project/default-placeholder.jpg';
            }}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 id="project-modal-title" className="text-2xl font-bold text-white mb-3">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              {project.description || 'No description available.'}
            </p>
            <div className="flex space-x-4">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-sm"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
