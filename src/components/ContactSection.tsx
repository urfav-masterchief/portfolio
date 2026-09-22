"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from "@/components/Icons";
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-neutral-800/60">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Initiate Handshake</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-neutral-400 mt-3 text-sm">
            Whether you are hiring for backend/distributed systems engineering roles, discussing system design, or want to collaborate on open-source code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Connect & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#0b0e14] border border-neutral-800/90 space-y-4">
              <h3 className="text-base font-bold font-mono text-neutral-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Direct Email Dispatch
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Click below to copy my primary email address directly to your clipboard or send an email through your preferred client.
              </p>

              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-cyan-300 truncate">
                  {PORTFOLIO_DATA.socials.email}
                </span>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Cards: GitHub, LinkedIn, Codeforces */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block px-1">
                Verified Developer Profiles:
              </span>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0e14] border border-neutral-800 hover:border-neutral-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-cyan-400 transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-neutral-200 group-hover:text-cyan-300">
                      GitHub
                    </h4>
                    <p className="text-xs font-mono text-neutral-500">
                      @{PORTFOLIO_DATA.socials.github.username}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  View Code &rarr;
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0e14] border border-neutral-800 hover:border-neutral-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-cyan-400 transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-neutral-200 group-hover:text-cyan-300">
                      LinkedIn
                    </h4>
                    <p className="text-xs font-mono text-neutral-500">
                      Professional Network & Experience
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  Connect &rarr;
                </span>
              </a>

              {/* Codeforces */}
              <a
                href={PORTFOLIO_DATA.socials.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0b0e14] border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <CodeforcesIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-mono text-neutral-200 group-hover:text-cyan-300">
                      Codeforces
                    </h4>
                    <p className="text-xs font-mono text-cyan-400/80">
                      @{PORTFOLIO_DATA.socials.codeforces.username} • {PORTFOLIO_DATA.socials.codeforces.problemsSolved} Solved
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  Inspect Rating &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#0b0e14] border border-neutral-800/90 shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-mono text-neutral-100 flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                Send a Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold font-mono text-neutral-100">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Thank you for reaching out. I will review your message and reply via email promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Opportunity / Technical Collaboration / Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share details about the role, project scope, or questions..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs font-mono focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
