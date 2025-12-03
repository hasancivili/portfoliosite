import { Project, ProjectCategory, Experience, Skill } from './types';

// --- PERSONAL INFO ---
export const PERSONAL_INFO = {
  name: "Hasan Civili",
  title: "3D Generalist & Technical Artist",
  email: "info@hasancivili.com", // Placeholder
  location: "Istanbul, Turkey",
  showreelUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // REPLACE THIS WITH YOUR REAL SHOWREEL EMBED URL
  socials: {
    linkedin: "https://linkedin.com/in/hasancivili",
    artstation: "https://artstation.com/hasancivili",
    github: "https://github.com/hasancivili",
    youtube: "https://youtube.com"
  },
  bio: `I am a passionate 3D Generalist and Technical Artist with a strong focus on bridging the gap between art and code. With years of experience in the CG industry, I specialize in character rigging, tool development, and pipeline optimization.
  
  My goal is to create efficient workflows that empower artists to create their best work without technical hurdles. Whether it's writing Python scripts for Maya, creating complex shaders in Unreal Engine, or rigging hyper-realistic characters, I enjoy tackling complex technical challenges.`
};

// --- SKILLS ---
export const SOFTWARE_SKILLS: Skill[] = [
  { name: "Maya", level: 95 },
  { name: "Blender", level: 90 },
  { name: "Unreal Engine 5", level: 85 },
  { name: "Houdini", level: 75 },
  { name: "Substance Painter", level: 85 },
  { name: "ZBrush", level: 80 },
];

export const CODING_SKILLS: Skill[] = [
  { name: "Python (PySide/PyQt)", level: 90 },
  { name: "VEX / Hscript", level: 70 },
  { name: "C++ (Maya API)", level: 60 },
  { name: "Blueprints", level: 85 },
  { name: "HLSL/GLSL", level: 65 },
];

// --- EXPERIENCE ---
export const WORK_EXPERIENCE: Experience[] = [
  {
    id: "1",
    role: "Senior Technical Artist",
    company: "Future Games Studio",
    period: "2021 - Present",
    description: "Leading the rigging pipeline and developing custom tools for UE5 integration. Automating asset export processes using Python."
  },
  {
    id: "2",
    role: "3D Generalist",
    company: "Creative Animation House",
    period: "2018 - 2021",
    description: "Responsible for character modeling, rigging, and lighting for TV series. Developed a proprietary auto-rigger for background characters."
  },
  {
    id: "3",
    role: "Junior 3D Artist",
    company: "Indie Game Co",
    period: "2016 - 2018",
    description: "Modeled and textured environment assets. Assisted with basic character rigging and animation retargeting."
  }
];

// --- PROJECTS ---
// NOTE: Replace the image URLs with your actual local assets or hosted images.
export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Cinematic Character Rig",
    category: ProjectCategory.RIGGING,
    thumbnail: "https://picsum.photos/id/1011/800/600",
    description: "A fully facial-rigged character for a cinematic trailer.",
    techStack: ["Maya", "Python", "mGear"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    longDescription: "This project involved creating a high-fidelity facial rig using a combination of joint-based deformation and blendshapes. I developed a custom Python tool to manage the corrective shapes driver system."
  },
  {
    id: "p2",
    title: "Procedural City Generator",
    category: ProjectCategory.TOOLS,
    thumbnail: "https://picsum.photos/id/1031/800/600",
    description: "Houdini HDA for generating city block layouts.",
    techStack: ["Houdini", "VEX", "Unreal Engine"],
    longDescription: "A Houdini Digital Asset (HDA) designed to quickly populate city blocks for a game environment. It exports point clouds to Unreal Engine for instanced mesh generation."
  },
  {
    id: "p3",
    title: "Sci-Fi Environment",
    category: ProjectCategory.MODELING,
    thumbnail: "https://picsum.photos/id/1033/800/600",
    description: "Real-time optimized sci-fi corridor.",
    techStack: ["Blender", "Substance", "UE5"],
  },
  {
    id: "p4",
    title: "Auto-Retargeting Tool",
    category: ProjectCategory.TOOLS,
    thumbnail: "https://picsum.photos/id/1070/800/600",
    description: "Python script to automate mocap data transfer.",
    techStack: ["Python", "Maya API"],
  },
  {
    id: "p5",
    title: "Stylized Shader Pack",
    category: ProjectCategory.SHADING,
    thumbnail: "https://picsum.photos/id/1080/800/600",
    description: "A collection of cel-shaded materials for Unity.",
    techStack: ["HLSL", "Unity"],
  },
   {
    id: "p6",
    title: "Mechanical Droid",
    thumbnail: "https://picsum.photos/id/1050/800/600",
    description: "Hard surface modeling and complex mechanical rigging.",
    techStack: ["Maya", "ZBrush", "Substance"],
    category: ProjectCategory.RIGGING
  }
];