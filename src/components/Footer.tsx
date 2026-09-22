"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from "@/components/Icons";
import { Terminal, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-[#06080d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-neutral-100">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-xs text-neutral-500 font-mono block">
                @{PORTFOLIO_DATA.personal.alias} • Backend & Systems
              </span>
            </div>
          </div>

          {/* System status pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Status: Operational</span>
            <span className="text-neutral-600">|</span>
            <span className="text-cyan-400">p99 &lt; 5ms</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.socials.codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
              title="Codeforces"
            >
              <CodeforcesIcon className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All systems reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted for speed, latency & reliability.
          </p>
        </div>
      </div>
    </footer>
  );
}
