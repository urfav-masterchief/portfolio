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

export interface PortfolioLayout {
  heroVisual: "terminal" | "picture" | "both" | "none";
  customPictureUrl: string;
  customPictureCaption?: string;
  showAbout: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showCompetitiveProgramming: boolean;
  showExperience: boolean;
  showContact: boolean;
}

export interface PortfolioTypography {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  headingWeight: string;
  letterSpacing: string;
}

export interface PortfolioTheme {
  preset: "astra-dark" | "cyber-cyan" | "emerald-matrix" | "violet-nebula" | "midnight-slate" | "crimson-stealth" | "custom";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
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
  layout?: PortfolioLayout;
  typography?: PortfolioTypography;
  theme?: PortfolioTheme;
}

export const DEFAULT_LAYOUT: PortfolioLayout = {
  heroVisual: "terminal",
  customPictureUrl: "",
  customPictureCaption: "Usmaan Ahamed Khan — Backend & Distributed Systems",
  showAbout: true,
  showSkills: true,
  showProjects: true,
  showCompetitiveProgramming: true,
  showExperience: true,
  showContact: true,
};

export const DEFAULT_TYPOGRAPHY: PortfolioTypography = {
  headingFont: "Plus Jakarta Sans",
  bodyFont: "Plus Jakarta Sans",
  monoFont: "JetBrains Mono",
  headingWeight: "bold",
  letterSpacing: "tight",
};

export const DEFAULT_THEME: PortfolioTheme = {
  preset: "astra-dark",
  primaryColor: "#00f2fe",
  secondaryColor: "#8b5cf6",
  accentColor: "#10b981",
  backgroundColor: "#05070c",
  cardColor: "#0a0d15",
};

export const PORTFOLIO_DATA: PortfolioData = {
  ...portfolioJson,
  layout: (portfolioJson as any).layout || DEFAULT_LAYOUT,
  typography: (portfolioJson as any).typography || DEFAULT_TYPOGRAPHY,
  theme: (portfolioJson as any).theme || DEFAULT_THEME,
} as unknown as PortfolioData;

