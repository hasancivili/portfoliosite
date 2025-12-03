import React from 'react';
import { Experience } from '../types';
import { Briefcase, Calendar } from 'lucide-react';

interface TimelineProps {
    experiences: Experience[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tech-500 via-art-500 to-transparent"></div>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.id}
                        className="relative pl-20 group"
                        style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                        }}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-dark-900 border-2 border-tech-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                            <div className="w-2 h-2 rounded-full bg-tech-500 group-hover:bg-art-500 transition-colors duration-300"></div>
                        </div>

                        {/* Icon */}
                        <div className="absolute left-0 top-0 w-16 h-16 rounded-xl bg-gradient-to-br from-tech-500/20 to-art-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-tech-500/50 transition-all duration-300">
                            <Briefcase className="w-7 h-7 text-tech-500 group-hover:text-art-500 transition-colors duration-300" />
                        </div>

                        {/* Content Card */}
                        <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-tech-500/50 hover:bg-dark-800/70 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-tech-500/10">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-tech-500 transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-art-500 font-medium text-lg">
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Period Badge */}
                                <div className="flex items-center gap-2 mt-2 md:mt-0 px-3 py-1.5 bg-dark-900/50 border border-white/10 rounded-lg text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>{exp.period}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed">
                                {exp.description}
                            </p>

                            {/* Decorative gradient line */}
                            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-tech-500 to-art-500 rounded-full transition-all duration-500"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add keyframes animation */}
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default Timeline;
