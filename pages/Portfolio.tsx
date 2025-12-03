import React, { useState, useMemo } from 'react';
import { PROJECTS, PERSONAL_INFO } from '../constants';
import { Project, ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Filter, Play, ChevronDown } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  const categories = ['All', ...Object.values(ProjectCategory).filter(c => c !== 'All')];

  const scrollToGrid = () => {
    const grid = document.getElementById('portfolio-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      
      {/* Hero / Showreel Section */}
      <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
         {/* Background accent */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900 z-10 pointer-events-none"></div>
         
         <div className="absolute inset-0 opacity-40">
            {/* If you have a background looping video, place it here. Using an image for now */}
            <img 
                src="https://picsum.photos/id/1002/1920/1080" 
                className="w-full h-full object-cover" 
                alt="Background" 
            />
         </div>

         <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
               {PERSONAL_INFO.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide uppercase">
               {PERSONAL_INFO.title}
            </p>
            
            <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black relative group">
               <iframe 
                  src={PERSONAL_INFO.showreelUrl} 
                  title="Generalist Showreel"
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
               ></iframe>
            </div>
            
            <div className="mt-12 animate-bounce cursor-pointer" onClick={scrollToGrid}>
               <ChevronDown className="w-8 h-8 text-white/50 hover:text-white mx-auto transition-colors" />
            </div>
         </div>
      </div>

      <div id="portfolio-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
             <h2 className="text-3xl font-bold text-white mb-2">Portfolio</h2>
             <p className="text-gray-400">Selected works and tools</p>
          </div>
          
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as ProjectCategory | 'All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-tech-600 border-tech-500 text-white'
                    : 'bg-dark-800 border-white/10 text-gray-400 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject} 
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-dark-800/30 rounded-lg border border-white/5 border-dashed">
                No projects found in this category.
            </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default Portfolio;