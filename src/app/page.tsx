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

export default function Home() {
  return (
    <div className="min-h-screen text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative bg-grid-pattern">
      {/* Interactive Astra & Antigravity Physics Background */}
      <AntigravityBackground />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CompetitiveProgrammingSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating 1-Click Portfolio Editor Trigger */}
      <FloatingEditorTrigger />
    </div>
  );
}
