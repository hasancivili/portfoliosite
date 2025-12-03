import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCE, CODING_SKILLS, SOFTWARE_SKILLS } from '../constants';
import { Project, ProjectCategory, Experience } from '../types';
import { Save, Plus, Trash2, Copy, Check, Lock, Code, Briefcase } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Data States
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [experiences, setExperiences] = useState<Experience[]>(WORK_EXPERIENCE);
  const [info, setInfo] = useState(PERSONAL_INFO);

  // UI States
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'info'>('projects');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Load data initially
  useEffect(() => {
    // In a real scenario, we might fetch this, but for static, we load imports
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check. 
    // Since this doesn't protect a database, a hardcoded string is fine for a static generator.
    if (password === 'artist123') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const generateConstantsFile = () => {
    const code = `import { Project, ProjectCategory, Experience, Skill } from './types';

// --- PERSONAL INFO ---
export const PERSONAL_INFO = ${JSON.stringify(info, null, 2)};

// --- SKILLS ---
export const SOFTWARE_SKILLS: Skill[] = ${JSON.stringify(SOFTWARE_SKILLS, null, 2)};

export const CODING_SKILLS: Skill[] = ${JSON.stringify(CODING_SKILLS, null, 2)};

// --- EXPERIENCE ---
export const WORK_EXPERIENCE: Experience[] = ${JSON.stringify(experiences, null, 2)};

// --- PROJECTS ---
// NOTE: Replace the image URLs with your actual local assets or hosted images.
export const PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};
`;
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Project Handlers
  const addProject = () => {
    const newProject: Project = {
      id: `p${Date.now()}`,
      title: 'New Project',
      category: ProjectCategory.MODELING,
      thumbnail: 'https://picsum.photos/800/600',
      description: 'Short description here',
      techStack: ['Maya'],
      longDescription: 'Detailed description here',
      videoUrl: ''
    };
    setProjects([newProject, ...projects]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const updateProjectStack = (id: string, stackString: string) => {
    const stackArray = stackString.split(',').map(s => s.trim()).filter(s => s !== '');
    updateProject(id, 'techStack', stackArray);
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // Experience Handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: `e${Date.now()}`,
      role: 'New Position',
      company: 'Company Name',
      period: '2024 - Present',
      description: 'Brief description of responsibilities and achievements'
    };
    setExperiences([newExperience, ...experiences]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  const deleteExperience = (id: string) => {
    if (window.confirm('Delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="bg-dark-800 p-8 rounded-xl border border-white/10 w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-tech-500/20 p-3 rounded-full">
              <Lock className="w-8 h-8 text-tech-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-tech-500 focus:outline-none"
                placeholder="Enter password (artist123)"
              />
            </div>
            <button type="submit" className="w-full bg-tech-600 hover:bg-tech-500 text-white font-bold py-3 rounded-lg transition-colors">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Code className="mr-3 text-tech-500" /> Content Editor
          </h1>
          <button
            onClick={() => {
              generateConstantsFile();
              // Scroll to bottom
              setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
            }}
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold shadow-lg transition-all"
          >
            <Save className="w-5 h-5 mr-2" />
            Generate Code
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'projects' ? 'text-tech-500 border-b-2 border-tech-500' : 'text-gray-400 hover:text-white'}`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'experience' ? 'text-tech-500 border-b-2 border-tech-500' : 'text-gray-400 hover:text-white'}`}
          >
            Work Experience ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'info' ? 'text-tech-500 border-b-2 border-tech-500' : 'text-gray-400 hover:text-white'}`}
          >
            Personal Info
          </button>
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <button
              onClick={addProject}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-tech-500/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span>Add New Project</span>
            </button>

            {projects.map((project, index) => (
              <div key={project.id} className="bg-dark-800 p-6 rounded-xl border border-white/10 relative group">
                <div className="absolute top-4 right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Thumbnail Preview */}
                  <div className="md:col-span-3">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/5 mb-2">
                      <img src={project.thumbnail} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">Thumbnail URL</label>
                    <input
                      type="text"
                      value={project.thumbnail}
                      onChange={(e) => updateProject(project.id, 'thumbnail', e.target.value)}
                      className="w-full bg-dark-900 border border-white/10 rounded px-2 py-1 text-xs text-gray-300 focus:border-tech-500 focus:outline-none"
                    />
                  </div>

                  {/* Fields */}
                  <div className="md:col-span-9 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <select
                          value={project.category}
                          onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        >
                          {Object.values(ProjectCategory).filter(c => c !== 'All').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Short Description</label>
                      <input
                        type="text"
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Video URL (Embed Link)</label>
                        <input
                          type="text"
                          value={project.videoUrl || ''}
                          onChange={(e) => updateProject(project.id, 'videoUrl', e.target.value)}
                          placeholder="https://youtube.com/embed/..."
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={project.techStack.join(', ')}
                          onChange={(e) => updateProjectStack(project.id, e.target.value)}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Gallery Images (URLs)
                      </label>
                      <div className="space-y-2">
                        {(project.images || []).map((img, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={img}
                              onChange={(e) => {
                                const newImages = [...(project.images || [])];
                                newImages[idx] = e.target.value;
                                updateProject(project.id, 'images', newImages);
                              }}
                              placeholder="https://..."
                              className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-tech-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = (project.images || []).filter((_, i) => i !== idx);
                                updateProject(project.id, 'images', newImages.length > 0 ? newImages : undefined);
                              }}
                              className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...(project.images || []), ''];
                            updateProject(project.id, 'images', newImages);
                          }}
                          className="w-full py-2 border border-dashed border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-tech-500/50 text-sm transition-all"
                        >
                          + Add Image
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Long Description</label>
                      <textarea
                        rows={3}
                        value={project.longDescription || ''}
                        onChange={(e) => updateProject(project.id, 'longDescription', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <button
              onClick={addExperience}
              className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-tech-500/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span>Add New Experience</span>
            </button>

            {experiences.map((exp) => (
              <div key={exp.id} className="bg-dark-800 p-6 rounded-xl border border-white/10 relative group">
                <div className="absolute top-4 right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-start mb-4">
                  <div className="bg-tech-500/20 p-3 rounded-lg mr-4">
                    <Briefcase className="w-6 h-6 text-tech-500" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Role / Position</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                        placeholder="e.g., 2021 - Present"
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="bg-dark-800 p-8 rounded-xl border border-white/10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={info.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="text"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  value={info.location}
                  onChange={(e) => setInfo({ ...info, location: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Showreel URL</label>
                <input
                  type="text"
                  value={info.showreelUrl}
                  onChange={(e) => setInfo({ ...info, showreelUrl: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  rows={5}
                  value={info.bio}
                  onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-tech-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Generated Code Output */}
        {generatedCode && (
          <div className="mt-12 animate-fade-in-up">
            <div className="bg-black rounded-xl border border-tech-500 overflow-hidden shadow-2xl">
              <div className="bg-tech-900/30 border-b border-tech-500/30 p-4 flex justify-between items-center">
                <h3 className="text-tech-400 font-mono text-sm font-bold flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  constants.ts (Generated)
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-4 py-2 bg-tech-600 hover:bg-tech-500 text-white rounded text-sm font-bold transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-xs leading-relaxed">
                  {generatedCode}
                </pre>
              </div>
              <div className="bg-yellow-900/20 p-4 border-t border-yellow-500/20 text-yellow-500 text-sm flex items-start">
                <span className="mr-2">⚠️</span>
                <p>
                  <strong>INSTRUCTION:</strong> Copy the code above, open your project's <code>constants.ts</code> file,
                  select everything inside it, and paste this code to overwrite it. Then deploy your site.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
