"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from "@/components/Icons";
import { Terminal, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Competitive Programming", href: "#competitive-programming" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080c]/85 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-xl shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#"
          className="flex items-center gap-2.5 text-neutral-200 hover:text-cyan-400 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/60 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-950/20 transition-all">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold tracking-wider text-neutral-100 flex items-center gap-1.5">
              <span>{PORTFOLIO_DATA.personal.alias}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">
              sys.eng()
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/80 px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-mono px-3 py-1.5 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-all duration-150"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons & Status */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800/60 border border-transparent hover:border-neutral-700/60 transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800/60 border border-transparent hover:border-neutral-700/60 transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={PORTFOLIO_DATA.socials.codeforces.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-neutral-300 hover:text-cyan-300 bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/40 transition-all"
            title="Codeforces Profile"
          >
            <CodeforcesIcon className="w-3.5 h-3.5" />
            <span>Codeforces</span>
          </a>

          <Link
            href="#contact"
            className="ml-2 text-xs font-mono font-medium px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={PORTFOLIO_DATA.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-neutral-100"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c13] border-b border-neutral-800/90 px-6 py-5 shadow-2xl space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono text-neutral-300 hover:text-cyan-400 py-2 border-b border-neutral-800/40"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 flex flex-wrap gap-2.5">
            <a
              href={PORTFOLIO_DATA.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-xs font-mono text-neutral-300 border border-neutral-800"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-xs font-mono text-neutral-300 border border-neutral-800"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a
              href={PORTFOLIO_DATA.socials.codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-xs font-mono text-cyan-400 border border-cyan-800/50"
            >
              <CodeforcesIcon className="w-3.5 h-3.5" />
              Codeforces
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
