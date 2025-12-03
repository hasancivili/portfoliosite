import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Box, Code, User, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Portfolio', path: '/', icon: <Box className="w-4 h-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <User className="w-4 h-4 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark-900/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <NavLink to="/" className="flex items-center text-xl font-bold text-white tracking-wider">
               <Code className="w-6 h-6 mr-2 text-tech-500" />
               <span className="text-white">HASAN</span>
               <span className="text-tech-500 ml-1">CIVILI</span>
             </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-tech-500 bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-800 border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-white bg-tech-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;