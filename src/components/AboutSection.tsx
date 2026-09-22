"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal, Shield, Zap, Database, GitBranch, Cpu, Code2, Server } from "lucide-react";

export default function AboutSection() {
  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Low Latency & High Throughput",
      description:
        "Dedicated to optimizing critical paths, eliminating unnecessary heap allocations, and leveraging non-blocking I/O.",
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: "Resilience & Fault Tolerance",
      description:
        "Designing with network partitions, failure domains, circuit breakers, and idempotent recovery at the forefront.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      title: "Low-Level Computer Science",
      description:
        "Strong understanding of memory hierarchy, OS primitives, thread synchronization, and cache locality in Java & C++.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-violet-400" />,
      title: "Algorithmic Precision",
      description:
        "Active competitive programmer with 600+ solved problems across graphs, dynamic programming, and data structures.",
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Building Scalable Systems from First Principles
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              I am a backend & systems software developer who thrives at the intersection of robust server infrastructure, multi-threaded programming, and algorithmic problem solving.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed">
              My primary focus lies in building microservice ecosystems in <strong className="text-neutral-200">Java & Spring Boot</strong> and high-performance, low-latency concurrent tools in <strong className="text-neutral-200">C++</strong>. Whether it&apos;s managing distributed state, implementing consensus mechanisms like Raft, or tuning SQL indexes and Redis caching strategies, I care about performance down to the millisecond.
            </p>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4 text-xs font-mono text-neutral-300">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-cyan-300 font-semibold block">Primary Toolset:</span>
                <span className="text-neutral-400">Java 21 • C++20 • Spring Boot • PostgreSQL • Redis • Docker • Kafka</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0b0e14] border border-neutral-800/80 hover:border-cyan-500/30 transition-all space-y-3"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-mono text-sm font-bold text-neutral-200">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
