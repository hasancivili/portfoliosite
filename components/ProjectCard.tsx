import React from 'react';
import { Project } from '../types';
import { ExternalLink, PlayCircle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="group relative bg-dark-800 rounded-lg overflow-hidden border border-white/5 hover:border-tech-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-tech-500/10"
      onClick={() => onClick(project)}
    >
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="object-cover w-full h-64 transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <span className="text-tech-500 text-sm font-medium flex items-center">
            View Details <ExternalLink className="w-4 h-4 ml-1" />
          </span>
          {project.videoUrl && (
             <PlayCircle className="w-8 h-8 text-white opacity-80" />
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
           <h3 className="text-lg font-bold text-white group-hover:text-tech-400 transition-colors">{project.title}</h3>
        </div>
        <p className="text-xs font-semibold text-tech-500 uppercase tracking-wide mb-2">{project.category}</p>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;