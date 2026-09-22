"use client";

import { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { GithubIcon } from "@/components/Icons";
import {
  FolderGit2,
  ChevronRight,
  Layers,
  X,
  CheckCircle2,
} from "lucide-react";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Distributed Systems",
    "Backend Services",
    "Algorithms & Tools",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative border-t border-neutral-800/60">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Flagship Engineering Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Featured Systems & Projects
            </h2>
            <p className="text-neutral-400 mt-2 max-w-xl text-sm">
              Production-grade distributed stores, high-throughput microservices, and algorithmic infrastructure built for resilience and speed.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-lg max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl bg-[#0b0e14] border border-neutral-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Header: Category & Metrics */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-cyan-400">
                    {project.category}
                  </span>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-semibold">
                        {project.metrics[0].value}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-100 font-mono group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Architecture Highlights */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                    Architecture Highlights:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-400">
                    {project.architecture.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5 font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Performance Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-neutral-900/70 p-2 rounded border border-neutral-800/70">
                      <span className="text-[10px] text-neutral-500 uppercase font-mono block">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer: Tech tags & Action Links */}
              <div className="px-6 py-4 bg-[#090b10] border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-neutral-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <span>Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-cyan-300 transition-colors"
                    title="View Source on GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Deep-Dive Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0e14] border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
                {activeModalProject.category}
              </span>
              <h3 className="text-2xl font-bold font-mono text-neutral-100 mt-2">
                {activeModalProject.title}
              </h3>
              <p className="text-sm text-neutral-400 font-mono mt-1">
                {activeModalProject.subtitle}
              </p>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeModalProject.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Architectural Breakdown & System Design Decisions
              </h4>
              <ul className="space-y-2 text-sm text-neutral-300">
                {activeModalProject.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {activeModalProject.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                  <span className="text-[10px] text-neutral-500 uppercase font-mono block">
                    {m.label}
                  </span>
                  <span className="text-sm font-bold font-mono text-cyan-400">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono text-xs font-bold transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
