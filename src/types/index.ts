export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  availability: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
  image: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  mediaUrl?: string;
  mediaType?: string;
  mediaName?: string;
  icon: string;
}
