import React from 'react';
import { Github, Linkedin, Youtube } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              3D Generalist & Technical Artist
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-tech-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;