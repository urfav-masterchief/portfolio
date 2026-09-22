import portfolioJson from "./portfolio.json";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface SkillItem {
  name: string;
  level: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    alias: string;
    headline: string;
    shortBio: string;
    location: string;
    availability: string;
    avatar: string;
    resumeUrl: string;
  };
  socials: {
    github: { url: string; label: string; username: string };
    linkedin: { url: string; label: string; username: string };
    codeforces: {
      url: string;
      label: string;
      username: string;
      rank: string;
      problemsSolved: string;
      favoriteTopics: string[];
    };
    email: string;
  };
  stats: { label: string; value: string; change: string }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  competitiveProgramming: {
    title: string;
    subtitle: string;
    codeforcesHandle: string;
    codeforcesUrl: string;
    stats: { label: string; value: string }[];
    topicMastery: { name: string; count: string; proficiency: number }[];
  };
  experience: ExperienceItem[];
}

export const PORTFOLIO_DATA: PortfolioData = portfolioJson as unknown as PortfolioData;
