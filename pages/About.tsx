import React from 'react';
import { PERSONAL_INFO, SOFTWARE_SKILLS, CODING_SKILLS, WORK_EXPERIENCE } from '../constants';
import { Download, Cpu, PenTool, Terminal } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
             <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-tech-500 to-art-500 rounded-2xl blur opacity-25"></div>
                <img 
                  src="https://picsum.photos/id/1005/600/600" 
                  alt={PERSONAL_INFO.name} 
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-500"
                />
             </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-500 to-art-500">{PERSONAL_INFO.name}</span>
            </h1>
            <h2 className="text-xl text-gray-300 mb-6 font-mono border-l-4 border-tech-500 pl-4">
              {PERSONAL_INFO.title}
            </h2>
            <div className="prose prose-invert prose-lg text-gray-400 mb-8 whitespace-pre-line">
              {PERSONAL_INFO.bio}
            </div>
            <button 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors border-white/10 hover:border-white/30"
              onClick={() => alert("Resume download simulation")}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Coding */}
          <div className="bg-dark-800 p-8 rounded-xl border border-white/5">
            <div className="flex items-center mb-6">
              <Terminal className="w-6 h-6 text-tech-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
            </div>
            <div className="space-y-6">
              {CODING_SKILLS.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div 
                      className="bg-tech-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div className="bg-dark-800 p-8 rounded-xl border border-white/5">
            <div className="flex items-center mb-6">
              <PenTool className="w-6 h-6 text-art-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Software Proficiency</h3>
            </div>
             <div className="space-y-6">
              {SOFTWARE_SKILLS.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div 
                      className="bg-art-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
             <Cpu className="w-6 h-6 text-white mr-3" />
             <h3 className="text-2xl font-bold text-white">Work History</h3>
          </div>
          
          <div className="space-y-8 border-l border-white/10 ml-3 pl-8 relative">
            {WORK_EXPERIENCE.map((job) => (
              <div key={job.id} className="relative">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-dark-900 bg-tech-500"></span>
                <div className="bg-dark-800/50 p-6 rounded-lg border border-white/5 hover:bg-dark-800 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <h4 className="text-xl font-bold text-white">{job.role}</h4>
                    <span className="text-tech-500 font-mono text-sm">{job.period}</span>
                  </div>
                  <h5 className="text-gray-400 font-medium mb-3">{job.company}</h5>
                  <p className="text-gray-400 leading-relaxed">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;