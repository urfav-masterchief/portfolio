"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Cpu, Server, Database, Layers, Sparkles, CheckCircle } from "lucide-react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
    Server: <Server className="w-5 h-5 text-violet-400" />,
    Database: <Database className="w-5 h-5 text-emerald-400" />,
    Layers: <Layers className="w-5 h-5 text-blue-400" />,
  };

  const categories = ["All", ...PORTFOLIO_DATA.skillCategories.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? PORTFOLIO_DATA.skillCategories
      : PORTFOLIO_DATA.skillCategories.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="py-24 relative border-t border-neutral-800/60">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-900/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Cpu className="w-4 h-4" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Engineering Skill Matrix
            </h2>
            <p className="text-neutral-400 mt-2 max-w-xl text-sm">
              Core technologies and architectural paradigms leveraged to construct reliable, production-ready distributed systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-lg max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-xl bg-[#0b0e14] border border-neutral-800/80 hover:border-neutral-700 transition-all duration-200 group relative overflow-hidden"
            >
              {/* Subtle card top gradient */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  {iconMap[category.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                </div>
                <h3 className="font-semibold text-lg text-neutral-100 font-mono">
                  {category.title}
                </h3>
              </div>

              {/* Skills badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col justify-between transition-all ${
                      skill.highlight
                        ? "bg-cyan-950/20 border-cyan-500/30 text-neutral-200 hover:border-cyan-500/60"
                        : "bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-medium text-neutral-100 truncate">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-cyan-950/20 via-neutral-900/60 to-violet-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-100 font-mono">
                Architectural Principles:
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Low garbage collector pressure, lock-free concurrency where possible, idempotency by default, and exhaustive edge-case testing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <CheckCircle className="w-4 h-4" />
            <span>Production First</span>
          </div>
        </div>
      </div>
    </section>
  );
}
