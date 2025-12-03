export enum ProjectCategory {
  ALL = 'All',
  RIGGING = 'Rigging',
  TOOLS = 'Tools/Scripting',
  MODELING = 'Modeling',
  SHADING = 'Shading/LookDev'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  description: string;
  longDescription?: string; // HTML allowed
  videoUrl?: string; // YouTube or Vimeo link
  images?: string[];
  techStack: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}