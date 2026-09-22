"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from "@/components/Icons";
import {
  ArrowRight,
  Download,
  Terminal,
  Server,
  Activity,
  CheckCircle2,
} from "lucide-react";
import SystemTerminal from "./SystemTerminal";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Intros */}
          <div className="lg:col-span-7 space-y-7">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs">
                {PORTFOLIO_DATA.personal.availability}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-mono tracking-widest text-cyan-400 uppercase">
                  Hi, I&apos;m {PORTFOLIO_DATA.personal.name}
                </h2>
                <span className="text-neutral-600 font-mono text-xs">/</span>
                <span className="text-neutral-400 font-mono text-xs bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  @{PORTFOLIO_DATA.personal.alias}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 leading-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Resilient Backend</span> & Distributed Systems.
              </h1>
            </div>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.personal.shortBio}
            </p>

            {/* Social Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={PORTFOLIO_DATA.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-800 hover:border-neutral-700 transition-all group"
              >
                <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                <span>github/{PORTFOLIO_DATA.socials.github.username}</span>
              </a>

              <a
                href={PORTFOLIO_DATA.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-800 hover:border-neutral-700 transition-all group"
              >
                <LinkedinIcon className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={PORTFOLIO_DATA.socials.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-cyan-300 text-xs font-mono border border-cyan-500/30 hover:border-cyan-500/60 transition-all group"
              >
                <CodeforcesIcon className="w-4 h-4" />
                <span>Codeforces Profile</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-medium text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
              >
                <span>View System Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-medium text-sm border border-neutral-800 hover:border-neutral-700 transition-all"
              >
                <span>Get In Touch</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-neutral-400 hover:text-neutral-200 text-sm font-mono transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Resume / CV</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-800/80">
              {PORTFOLIO_DATA.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-100 flex items-center gap-1.5">
                    <span>{stat.value}</span>
                    <span className="text-[10px] font-normal text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/40">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive System Terminal Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Subtle decorative glow around terminal */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl -z-10 opacity-70"></div>
              <SystemTerminal />
            </div>

            {/* Quick architectural spec badge */}
            <div className="mt-4 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm flex items-center justify-between text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Distributed Consensus & APIs</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ACID & Idempotent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
