"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { CodeforcesIcon } from "@/components/Icons";
import { Trophy, ExternalLink, Flame, CheckCircle, Zap } from "lucide-react";

export default function CompetitiveProgrammingSection() {
  const { competitiveProgramming } = PORTFOLIO_DATA;

  return (
    <section id="competitive-programming" className="py-24 relative border-t border-neutral-800/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4" />
              <span>Algorithmic Rigor & Speed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Competitive Programming & DSA
            </h2>
            <p className="text-neutral-400 mt-2 max-w-2xl text-sm">
              Continuous practice in mathematical reasoning, asymptotic time/space complexity optimization, and clean implementation under contest time pressure.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.socials.codeforces.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-all max-w-fit shadow-lg shadow-cyan-950/40"
          >
            <CodeforcesIcon className="w-4 h-4" />
            <span>Codeforces: @{PORTFOLIO_DATA.socials.codeforces.username}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 text-cyan-400" />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {competitiveProgramming.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0b0e14] border border-neutral-800/80 hover:border-cyan-500/30 transition-colors"
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-mono block mb-1">
                {stat.label}
              </span>
              <span className="text-2xl font-bold font-mono text-neutral-100">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Topic Mastery & Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Topics Breakdown */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl bg-[#0b0e14] border border-neutral-800/80 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Algorithmic Topic Mastery
              </h3>
              <span className="text-xs font-mono text-neutral-500">
                C++20 & Java Implementations
              </span>
            </div>

            <div className="space-y-4">
              {competitiveProgramming.topicMastery.map((topic) => (
                <div key={topic.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-300 font-medium">
                      {topic.name}
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      {topic.count}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${topic.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Codeforces Callout Card */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-gradient-to-b from-[#0e121a] to-[#090b10] border border-cyan-500/30 space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Contest Discipline</span>
            </div>

            <h3 className="text-xl font-bold font-mono text-neutral-100">
              Why Competitive Programming Matters in Systems
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Writing low-latency server software requires an intuitive grasp of cache-friendly memory access, constant factor overhead, amortized analysis, and zero tolerance for memory leaks.
            </p>

            <div className="space-y-2.5 pt-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero allocations in critical inner loops</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Deterministic O(N log N) / O(N) guarantees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Strict edge case & boundary defense</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={PORTFOLIO_DATA.socials.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
              >
                <CodeforcesIcon className="w-4 h-4" />
                <span>View Full Codeforces Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
