"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative border-t border-neutral-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Timeline & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
            Engineering Journey
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Milestones in distributed systems development, competitive programming, and computer science foundations.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-neutral-800 ml-4 sm:ml-8 space-y-12">
          {PORTFOLIO_DATA.experience.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-cyan-500 group-hover:bg-cyan-400 transition-colors shadow-sm" />

              <div className="p-6 sm:p-7 rounded-xl bg-[#0b0e14] border border-neutral-800/90 hover:border-neutral-700 transition-all space-y-4">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold font-mono text-neutral-100">
                      {item.role}
                    </h3>
                    <p className="text-sm text-cyan-400 font-mono mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Description bullet points */}
                <ul className="space-y-2 text-sm text-neutral-300">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-neutral-800/60">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
