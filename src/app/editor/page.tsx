"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData, Project, SkillCategory } from "@/data/portfolio";
import {
  Save,
  RotateCcw,
  ArrowLeft,
  User,
  Share2,
  Cpu,
  FolderGit2,
  Trophy,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function EditorPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "socials" | "dsa" | "projects" | "skills">("profile");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio data", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveStatus(null);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setSaveStatus({ type: "success", message: "Portfolio saved successfully! Changes are now live." });
      } else {
        setSaveStatus({ type: "error", message: result.error || "Failed to save portfolio." });
      }
    } catch (err) {
      setSaveStatus({ type: "error", message: "Network error saving portfolio." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080d] text-neutral-300 flex items-center justify-center font-mono text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span>Loading Portfolio Editor...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#06080d] text-neutral-300 flex items-center justify-center font-mono text-sm">
        <p className="text-red-400">Failed to load portfolio data from backend.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-neutral-200 font-sans">
      {/* Top sticky action bar */}
      <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-cyan-300 text-xs font-mono border border-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Website</span>
          </Link>
          <span className="hidden sm:inline text-neutral-600 font-mono">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-neutral-100">
              Interactive Portfolio Manager
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <span>Preview in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            {saving ? (
              <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Saving..." : "Save & Publish"}</span>
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveStatus && (
        <div
          className={`max-w-4xl mx-auto mt-4 px-4 py-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono ${
            saveStatus.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{saveStatus.message}</span>
          </div>
          <button
            onClick={() => setSaveStatus(null)}
            className="text-neutral-400 hover:text-neutral-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main editor container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 mb-8 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "profile"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab("socials")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "socials"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Socials & Links</span>
          </button>

          <button
            onClick={() => setActiveTab("dsa")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "dsa"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>DSA & Codeforces</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "projects"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "skills"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Skills Matrix</span>
          </button>
        </div>

        {/* TAB 1: Profile & Bio */}
        {activeTab === "profile" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                Personal Information & Headline
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Configure your display name, headline, and bio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Full Name</label>
                <input
                  type="text"
                  value={data.personal.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Alias / Handle</label>
                <input
                  type="text"
                  value={data.personal.alias}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, alias: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-400">Professional Headline</label>
              <input
                type="text"
                value={data.personal.headline}
                onChange={(e) =>
                  setData({
                    ...data,
                    personal: { ...data.personal, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-400">Bio / About Description</label>
              <textarea
                rows={4}
                value={data.personal.shortBio}
                onChange={(e) =>
                  setData({
                    ...data,
                    personal: { ...data.personal, shortBio: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Availability Status</label>
                <input
                  type="text"
                  value={data.personal.availability}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, availability: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Location</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, location: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Socials & Profiles */}
        {activeTab === "socials" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                Connected Profiles & Contact
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Update URLs for LinkedIn, GitHub, Codeforces, and your direct contact email.
              </p>
            </div>

            <div className="space-y-4">
              {/* LinkedIn */}
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-semibold block">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={data.socials.linkedin.url}
                  onChange={(e) =>
                    setData({
                      ...data,
                      socials: {
                        ...data.socials,
                        linkedin: { ...data.socials.linkedin, url: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-semibold block">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={data.socials.github.url}
                  onChange={(e) =>
                    setData({
                      ...data,
                      socials: {
                        ...data.socials,
                        github: { ...data.socials.github, url: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Codeforces */}
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-semibold block">
                  Codeforces Profile URL & Handle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="url"
                    placeholder="https://codeforces.com/profile/urfav_mani"
                    value={data.socials.codeforces.url}
                    onChange={(e) =>
                      setData({
                        ...data,
                        socials: {
                          ...data.socials,
                          codeforces: { ...data.socials.codeforces, url: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Handle (e.g. urfav_mani)"
                    value={data.socials.codeforces.username}
                    onChange={(e) =>
                      setData({
                        ...data,
                        socials: {
                          ...data.socials,
                          codeforces: { ...data.socials.codeforces, username: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-semibold block">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={data.socials.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      socials: { ...data.socials, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DSA & Codeforces */}
        {activeTab === "dsa" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                DSA & Competitive Programming Tracker
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Customize your journey representation, active goals, and topics in progress.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Section Title</label>
                <input
                  type="text"
                  value={data.competitiveProgramming.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      competitiveProgramming: {
                        ...data.competitiveProgramming,
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Codeforces Handle</label>
                <input
                  type="text"
                  value={data.competitiveProgramming.codeforcesHandle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      competitiveProgramming: {
                        ...data.competitiveProgramming,
                        codeforcesHandle: e.target.value,
                        codeforcesUrl: `https://codeforces.com/profile/${e.target.value}`,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-400">Subtitle / Philosophy</label>
              <textarea
                rows={2}
                value={data.competitiveProgramming.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    competitiveProgramming: {
                      ...data.competitiveProgramming,
                      subtitle: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            {/* Topics in Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                  Topics in Progress
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      competitiveProgramming: {
                        ...data.competitiveProgramming,
                        topicMastery: [
                          ...data.competitiveProgramming.topicMastery,
                          { name: "New Topic", count: "In Progress", proficiency: 60 },
                        ],
                      },
                    })
                  }
                  className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Topic</span>
                </button>
              </div>

              <div className="space-y-2">
                {data.competitiveProgramming.topicMastery.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={topic.name}
                      onChange={(e) => {
                        const updated = [...data.competitiveProgramming.topicMastery];
                        updated[idx].name = e.target.value;
                        setData({
                          ...data,
                          competitiveProgramming: {
                            ...data.competitiveProgramming,
                            topicMastery: updated,
                          },
                        });
                      }}
                      className="flex-1 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                    />

                    <input
                      type="text"
                      value={topic.count}
                      placeholder="Status (e.g. In Progress)"
                      onChange={(e) => {
                        const updated = [...data.competitiveProgramming.topicMastery];
                        updated[idx].count = e.target.value;
                        setData({
                          ...data,
                          competitiveProgramming: {
                            ...data.competitiveProgramming,
                            topicMastery: updated,
                          },
                        });
                      }}
                      className="w-36 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 focus:border-cyan-500 focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.competitiveProgramming.topicMastery.filter(
                          (_, i) => i !== idx
                        );
                        setData({
                          ...data,
                          competitiveProgramming: {
                            ...data.competitiveProgramming,
                            topicMastery: updated,
                          },
                        });
                      }}
                      className="p-1.5 text-neutral-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Projects Manager */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Projects Management
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Add, edit, or remove projects shown on your portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newProj: Project = {
                    id: `project-${Date.now()}`,
                    title: "New Project Title",
                    subtitle: "Brief subtitle explaining technology & role",
                    category: "Backend Services",
                    description: "Describe what this project does and problems it solves.",
                    architecture: ["Architecture highlight 1", "Architecture highlight 2"],
                    metrics: [{ label: "Language", value: "Java" }],
                    tags: ["Java", "OOP"],
                    githubUrl: "https://github.com/urfav-masterchief",
                    featured: true,
                  };
                  setData({ ...data, projects: [newProj, ...data.projects] });
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-neutral-500 uppercase">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[idx].title = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-neutral-500 uppercase">
                          Category
                        </label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[idx].category = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== idx);
                        setData({ ...data, projects: updated });
                      }}
                      className="p-2 rounded-lg bg-neutral-900 text-neutral-500 hover:text-red-400 border border-neutral-800 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-500 uppercase">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={proj.subtitle}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].subtitle = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-500 uppercase">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[idx].description = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-500 uppercase">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={proj.githubUrl}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].githubUrl = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-500 uppercase">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.tags.join(", ")}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].tags = e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Skills Matrix */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                Skills Categories & Technologies
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Customize your technical competencies and proficiency markers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skillCategories.map((category, cIdx) => (
                <div
                  key={category.title || cIdx}
                  className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => {
                        const updated = [...data.skillCategories];
                        updated[cIdx].title = e.target.value;
                        setData({ ...data, skillCategories: updated });
                      }}
                      className="font-mono text-sm font-bold text-neutral-100 bg-transparent border-b border-neutral-700/60 focus:border-cyan-400 outline-none px-1 py-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...data.skillCategories];
                        updated[cIdx].skills.push({
                          name: "New Skill",
                          level: "Learning",
                          highlight: false,
                        });
                        setData({ ...data, skillCategories: updated });
                      }}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-cyan-400 border border-neutral-800"
                    >
                      + Add Skill
                    </button>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs font-mono"
                      >
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].name = e.target.value;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="flex-1 bg-transparent text-neutral-100 outline-none"
                        />
                        <input
                          type="text"
                          value={skill.level}
                          onChange={(e) => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].level = e.target.value;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="w-24 text-neutral-400 bg-transparent border-l border-neutral-800 pl-2 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].highlight = !skill.highlight;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            skill.highlight
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                              : "text-neutral-500 hover:text-neutral-300"
                          }`}
                          title="Toggle Highlight"
                        >
                          ★
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills = updated[cIdx].skills.filter((_, i) => i !== sIdx);
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="text-neutral-500 hover:text-red-400 px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
