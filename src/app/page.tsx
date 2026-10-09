"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CompetitiveProgrammingSection from "@/components/CompetitiveProgrammingSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AntigravityBackground from "@/components/AntigravityBackground";
import FloatingEditorTrigger from "@/components/FloatingEditorTrigger";
import ThemeAndFontSync from "@/components/ThemeAndFontSync";
import { PORTFOLIO_DATA, PortfolioLayout } from "@/data/portfolio";

export default function Home() {
  const [layout, setLayout] = useState<PortfolioLayout>(
    PORTFOLIO_DATA.layout || {
      heroVisual: "terminal",
      customPictureUrl: "",
      customPictureCaption: "Usmaan Ahamed Khan — Backend & Distributed Systems",
      showAbout: true,
      showSkills: true,
      showProjects: true,
      showCompetitiveProgramming: true,
      showExperience: true,
      showContact: true,
    }
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_preview_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.layout) setLayout(parsed.layout);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative astra-glow-mesh transition-colors duration-500">
      <ThemeAndFontSync theme={PORTFOLIO_DATA.theme} typography={PORTFOLIO_DATA.typography} />
      
      {/* Interactive Astra & Antigravity Physics Background */}
      <AntigravityBackground />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        {layout.showAbout !== false && <AboutSection />}
        {layout.showSkills !== false && <SkillsSection />}
        {layout.showProjects !== false && <ProjectsSection />}
        {layout.showCompetitiveProgramming !== false && <CompetitiveProgrammingSection />}
        {layout.showExperience !== false && <ExperienceSection />}
        {layout.showContact !== false && <ContactSection />}
      </main>
      <Footer />

      {/* Floating 1-Click Portfolio Editor Trigger */}
      <FloatingEditorTrigger />
    </div>
  );
}
