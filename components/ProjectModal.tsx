import React from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-dark-900 border border-white/10 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-gradient-to-b from-dark-900 to-transparent">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-tech-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-0">
          {/* Media Section */}
          <div className="mb-6 rounded-lg overflow-hidden bg-black aspect-video">
            {project.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={project.videoUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-tech-500 font-medium mb-4">{project.category}</p>

              <div className="prose prose-invert max-w-none text-gray-300 mb-6">
                <p>{project.longDescription || project.description}</p>
              </div>
            </div>

            <div className="md:col-span-1 space-y-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-tech-500/20 text-tech-500 rounded text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery Section */}
              {project.images && project.images.length > 0 && (
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Gallery</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-black border border-white/5 hover:border-tech-500/50 transition-colors">
                        <img
                          src={img}
                          alt={`${project.title} ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;