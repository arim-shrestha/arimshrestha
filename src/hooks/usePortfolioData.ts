import about from "@/data/about.json";
import contact from "@/data/contact.json";
import experience from "@/data/experience.json";
import home from "@/data/home.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import type { ExperienceItem, PortfolioProfile, ProjectItem, SkillCategory } from "@/lib/portfolioTypes";

export function useProfile() {
  const data: PortfolioProfile = {
    ...home,
    bio: about.bio,
    email: contact.email,
    github: contact.github,
    githubWork: contact.githubWork,
    facebook: contact.facebook,
    instagram: contact.instagram,
    linkedin: contact.linkedin,
    phone: contact.phone,
    website: contact.website,
  };

  return { data, loading: false };
}

export function useSkills() {
  const data: SkillCategory[] = [...skills.categories].sort(
    (a, b) => a.order - b.order,
  );

  return {
    data,
    loading: false,
  };
}

export function useExperience() {
  const data: ExperienceItem[] = [...experience.items].sort(
    (a, b) => a.order - b.order,
  );

  return {
    data,
    loading: false,
  };
}

export function useProjects() {
  const data: ProjectItem[] = (projects.items as ProjectItem[])
    .filter((project) => project.isVisible)
    .sort((a, b) => a.order - b.order);

  return {
    data,
    loading: false,
  };
}
