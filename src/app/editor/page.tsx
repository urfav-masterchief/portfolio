"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  PortfolioData,
  PortfolioLayout,
  PortfolioTypography,
  PortfolioTheme,
  Project,
  SkillCategory,
  DEFAULT_LAYOUT,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_THEME,
} from "@/data/portfolio";
import {
  Save,
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
  Layout,
  Type,
  Palette,
  Upload,
  Image as ImageIcon,
  Terminal as TerminalIcon,
  Eye,
  EyeOff,
  Rocket,
  RefreshCw,
  Sliders,
  Check,
} from "lucide-react";

interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    card: string;
  };
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "astra-dark",
    name: "Astra Cosmic",
    description: "Deep starlit void with electric cyan and celestial violet",
    colors: {
      primary: "#00f2fe",
      secondary: "#8b5cf6",
      accent: "#10b981",
      bg: "#05070c",
      card: "#0a0d15",
    },
  },
  {
    id: "cyber-cyan",
    name: "Cyber Neon",
    description: "High-contrast midnight cyber with piercing sky cyan",
    colors: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      accent: "#14b8a6",
      bg: "#040810",
      card: "#08101e",
    },
  },
  {
    id: "emerald-matrix",
    name: "Emerald Systems",
    description: "Deep obsidian matrix with vibrant emerald and mint neon",
    colors: {
      primary: "#10b981",
      secondary: "#06b6d4",
      accent: "#34d399",
      bg: "#030806",
      card: "#06130e",
    },
  },
  {
    id: "violet-nebula",
    name: "Violet Nebula",
    description: "Royal cosmic amethyst and radiant fuchsia starlight",
    colors: {
      primary: "#a855f7",
      secondary: "#ec4899",
      accent: "#38bdf8",
      bg: "#090514",
      card: "#120a24",
    },
  },
  {
    id: "midnight-slate",
    name: "Midnight Slate",
    description: "Ultra-clean Scandinavian minimal dark with frosty ice blue",
    colors: {
      primary: "#38bdf8",
      secondary: "#94a3b8",
      accent: "#10b981",
      bg: "#090c10",
      card: "#0e131b",
    },
  },
  {
    id: "crimson-stealth",
    name: "Crimson Stealth",
    description: "Onyx stealth armor with laser crimson and amber heat",
    colors: {
      primary: "#f43f5e",
      secondary: "#f59e0b",
      accent: "#fb7185",
      bg: "#090406",
      card: "#14080c",
    },
  },
  {
    id: "solar-amber",
    name: "Solar Flare",
    description: "Molten gold and sunset coral on dark obsidian",
    colors: {
      primary: "#f59e0b",
      secondary: "#f97316",
      accent: "#eab308",
      bg: "#090704",
      card: "#140e08",
    },
  },
];

const HEADING_FONTS = [
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans", sample: "Resilient Distributed Architecture" },
  { id: "Inter", name: "Inter", sample: "Modern High-Throughput Microservices" },
  { id: "Space Grotesk", name: "Space Grotesk", sample: "Zero-Knowledge Consensus Engine" },
  { id: "Outfit", name: "Outfit", sample: "Ultra-Low Latency Packet Routing" },
  { id: "DM Sans", name: "DM Sans", sample: "Idempotent Transaction Pipeline" },
  { id: "Syne", name: "Syne", sample: "Futuristic Algorithmic Mastery" },
  { id: "JetBrains Mono", name: "JetBrains Mono", sample: "fn cluster_sync() -> Result<()>" },
];

const BODY_FONTS = [
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans", sample: "Modern, balanced geometric curves engineered for prolonged readability." },
  { id: "Inter", name: "Inter", sample: "The world's most widely adopted UI typeface for precision developer interfaces." },
  { id: "Outfit", name: "Outfit", sample: "Friendly, contemporary digital typography that looks clean at all resolutions." },
  { id: "DM Sans", name: "DM Sans", sample: "Relaxed geometric proportions with exceptional character distinction." },
  { id: "System", name: "System UI", sample: "Blazing fast native device system font stack with zero network overhead." },
];

const MONO_FONTS = [
  { id: "JetBrains Mono", name: "JetBrains Mono", sample: "const latency_p99 = 1.42; // ms" },
  { id: "Fira Code", name: "Fira Code", sample: "git commit -m 'deploy: vercel subagent'" },
  { id: "Geist Mono", name: "Geist Mono", sample: "redis.cluster().publish('events', payload)" },
  { id: "monospace", name: "System Monospace", sample: "grep -rn 'distributed' src/" },
];

export default function EditorPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "layout" | "fonts" | "theme" | "profile" | "socials" | "dsa" | "projects" | "skills" | "deploy"
  >("layout");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        // Ensure defaults are populated if missing
        const completeData: PortfolioData = {
          ...json,
          layout: json.layout || DEFAULT_LAYOUT,
          typography: json.typography || DEFAULT_TYPOGRAPHY,
          theme: json.theme || DEFAULT_THEME,
        };
        setData(completeData);
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
      // Sync to localStorage for immediate live feedback across tabs
      localStorage.setItem(
        "portfolio_preview_settings",
        JSON.stringify({
          layout: data.layout,
          typography: data.typography,
          theme: data.theme,
        })
      );

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setSaveStatus({
          type: "success",
          message: "Portfolio changes saved & published successfully! Changes are now live.",
        });
      } else {
        setSaveStatus({ type: "error", message: result.error || "Failed to save portfolio." });
      }
    } catch {
      setSaveStatus({ type: "error", message: "Network error saving portfolio." });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        const updatedLayout: PortfolioLayout = {
          ...(data.layout || DEFAULT_LAYOUT),
          customPictureUrl: result.url,
          heroVisual: data.layout?.heroVisual === "terminal" ? "picture" : data.layout?.heroVisual || "picture",
        };
        const updatedPersonal = {
          ...data.personal,
          avatar: result.url,
        };
        setData({
          ...data,
          layout: updatedLayout,
          personal: updatedPersonal,
        });
        setSaveStatus({
          type: "success",
          message: "Image uploaded successfully! Remember to click 'Save & Publish' to persist.",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: result.error || "Failed to upload image.",
        });
      }
    } catch {
      setSaveStatus({
        type: "error",
        message: "Network error while uploading image.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070c] text-neutral-300 flex items-center justify-center font-mono text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span>Loading Portfolio Visual Engine...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#05070c] text-neutral-300 flex items-center justify-center font-mono text-sm">
        <p className="text-red-400">Failed to load portfolio data from backend.</p>
      </div>
    );
  }

  const currentLayout = data.layout || DEFAULT_LAYOUT;
  const currentTypography = data.typography || DEFAULT_TYPOGRAPHY;
  const currentTheme = data.theme || DEFAULT_THEME;

  return (
    <div className="min-h-screen bg-[#05070c] text-neutral-200 font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Top sticky action bar */}
      <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3 flex items-center justify-between">
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
              Interactive Portfolio Visual Manager
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
            <span>Live Preview</span>
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
          className={`max-w-5xl mx-auto mt-4 px-4 py-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono ${
            saveStatus.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
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
            onClick={() => setActiveTab("layout")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "layout"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Layout & Media</span>
          </button>

          <button
            onClick={() => setActiveTab("fonts")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "fonts"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Fonts & Typography</span>
          </button>

          <button
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "theme"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Color Theme</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "skills"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Skills Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("deploy")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === "deploy"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span>Vercel Deploy</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB: LAYOUT & MEDIA (REMOVE CONTENTS & UPLOAD PICTURE) */}
        {/* ========================================================= */}
        {activeTab === "layout" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Layout & Content Sections Manager
                </h2>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Customize what appears on your portfolio. Switch between the interactive Terminal, your uploaded photo/portrait, or remove sections completely.
              </p>
            </div>

            {/* 1. Hero Visual Mode: Terminal vs Picture */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-mono text-neutral-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Hero Visual Showcase Mode</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Mode: Terminal */}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      layout: { ...currentLayout, heroVisual: "terminal" },
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition-all ${
                    currentLayout.heroVisual === "terminal"
                      ? "bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <TerminalIcon
                      className={`w-5 h-5 ${
                        currentLayout.heroVisual === "terminal" ? "text-cyan-400" : "text-neutral-400"
                      }`}
                    />
                    {currentLayout.heroVisual === "terminal" && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold font-mono text-neutral-100">System Terminal</h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    Interactive CLI console with commands and system metrics.
                  </p>
                </button>

                {/* Mode: Picture */}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      layout: { ...currentLayout, heroVisual: "picture" },
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition-all ${
                    currentLayout.heroVisual === "picture"
                      ? "bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <ImageIcon
                      className={`w-5 h-5 ${
                        currentLayout.heroVisual === "picture" ? "text-cyan-400" : "text-neutral-400"
                      }`}
                    />
                    {currentLayout.heroVisual === "picture" && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold font-mono text-neutral-100">Profile Photo / Portrait</h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    Replaces terminal with your custom portrait or picture card.
                  </p>
                </button>

                {/* Mode: Both */}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      layout: { ...currentLayout, heroVisual: "both" },
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition-all ${
                    currentLayout.heroVisual === "both"
                      ? "bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Sliders
                      className={`w-5 h-5 ${
                        currentLayout.heroVisual === "both" ? "text-cyan-400" : "text-neutral-400"
                      }`}
                    />
                    {currentLayout.heroVisual === "both" && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold font-mono text-neutral-100">Dual Mode (Tabbed)</h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    Visitors can easily toggle between Terminal and Photo.
                  </p>
                </button>

                {/* Mode: None */}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      layout: { ...currentLayout, heroVisual: "none" },
                    })
                  }
                  className={`p-4 rounded-xl border text-left transition-all ${
                    currentLayout.heroVisual === "none"
                      ? "bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                      : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <EyeOff
                      className={`w-5 h-5 ${
                        currentLayout.heroVisual === "none" ? "text-cyan-400" : "text-neutral-400"
                      }`}
                    />
                    {currentLayout.heroVisual === "none" && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold font-mono text-neutral-100">Minimal Bio (No Media)</h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    Full-width centered layout focusing strictly on your text.
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Upload / Change Photo Section */}
            {(currentLayout.heroVisual === "picture" || currentLayout.heroVisual === "both") && (
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload & Update Your Picture</span>
                </h4>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Photo Preview Frame */}
                  <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0 flex items-center justify-center group">
                    {currentLayout.customPictureUrl ? (
                      <img
                        src={currentLayout.customPictureUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-3">
                        <ImageIcon className="w-8 h-8 text-neutral-600 mx-auto" />
                        <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                          No Photo
                        </span>
                      </div>
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-neutral-950/80 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Actions & URL Input */}
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-neutral-950 font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? "Uploading..." : "Upload Photo from Computer"}</span>
                      </button>
                      <span className="text-[11px] text-neutral-500 font-mono ml-3">
                        JPG, PNG, WebP, GIF (Max 10MB)
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400">
                        Or enter direct image URL:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          placeholder="https://example.com/your-photo.jpg"
                          value={currentLayout.customPictureUrl || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              layout: { ...currentLayout, customPictureUrl: e.target.value },
                            })
                          }
                          className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                        />
                        {currentLayout.customPictureUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setData({
                                ...data,
                                layout: { ...currentLayout, customPictureUrl: "" },
                              })
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 border border-neutral-800 text-xs font-mono"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400">
                        Picture Card Caption / Title:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Usmaan Khan — Distributed Systems"
                        value={currentLayout.customPictureCaption || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            layout: { ...currentLayout, customPictureCaption: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Section Visibility Toggles (Remove Contents) */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <div>
                <h3 className="text-sm font-bold font-mono text-neutral-200">
                  Toggle & Remove Content Sections
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Easily hide or remove entire sections from the live website with a single click.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: "showAbout" as const,
                    title: "About Me Section",
                    desc: "Background story, distributed systems principles, and personal journey.",
                  },
                  {
                    key: "showSkills" as const,
                    title: "Skills Matrix Section",
                    desc: "Languages, backend frameworks, distributed tools, and database proficiencies.",
                  },
                  {
                    key: "showProjects" as const,
                    title: "Flagship Projects Section",
                    desc: "Interactive system architecture cards, throughput metrics, and modal deep-dives.",
                  },
                  {
                    key: "showCompetitiveProgramming" as const,
                    title: "DSA & Codeforces Section",
                    desc: "Live Codeforces stats, topic mastery bars, and algorithmic discipline tracker.",
                  },
                  {
                    key: "showExperience" as const,
                    title: "Experience / Timeline Section",
                    desc: "Engineering milestones, coursework, and organizational history.",
                  },
                  {
                    key: "showContact" as const,
                    title: "Contact & Dispatch Form",
                    desc: "One-click copy email button, social profile links, and message dispatch.",
                  },
                ].map((item) => {
                  const isVisible = currentLayout[item.key] !== false;
                  return (
                    <div
                      key={item.key}
                      onClick={() =>
                        setData({
                          ...data,
                          layout: { ...currentLayout, [item.key]: !isVisible },
                        })
                      }
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isVisible
                          ? "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                          : "bg-neutral-950/40 border-neutral-900 opacity-60"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isVisible ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"
                            }`}
                          />
                          <h4 className="text-xs font-bold font-mono text-neutral-200">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div
                        className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 transition-colors ${
                          isVisible
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                        }`}
                      >
                        {isVisible ? "Visible" : "Hidden"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: FONTS & TYPOGRAPHY */}
        {/* ========================================================= */}
        {activeTab === "fonts" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Typography & Font Family Editor
                </h2>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Customize your portfolio typography to match your aesthetic. Changes dynamically adapt in real-time.
              </p>
            </div>

            {/* 1. Heading Font Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-neutral-200 flex items-center justify-between">
                <span>Headline & Title Typeface</span>
                <span className="text-cyan-400 font-normal">Active: {currentTypography.headingFont}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {HEADING_FONTS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        typography: { ...currentTypography, headingFont: font.id },
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      currentTypography.headingFont === font.id
                        ? "bg-cyan-500/10 border-cyan-500/60 shadow-md shadow-cyan-500/10"
                        : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-neutral-200">
                        {font.name}
                      </span>
                      {currentTypography.headingFont === font.id && (
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <p
                      className="text-xs text-neutral-400 truncate mt-1"
                      style={{ fontFamily: font.id }}
                    >
                      {font.sample}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Body Font Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-neutral-200 flex items-center justify-between">
                <span>Body Text & Paragraph Typeface</span>
                <span className="text-cyan-400 font-normal">Active: {currentTypography.bodyFont}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BODY_FONTS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        typography: { ...currentTypography, bodyFont: font.id },
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      currentTypography.bodyFont === font.id
                        ? "bg-cyan-500/10 border-cyan-500/60 shadow-md shadow-cyan-500/10"
                        : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-neutral-200">
                        {font.name}
                      </span>
                      {currentTypography.bodyFont === font.id && (
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <p
                      className="text-[11px] text-neutral-400 line-clamp-2 mt-1"
                      style={{ fontFamily: font.id }}
                    >
                      {font.sample}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Monospace Code Font */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-neutral-200 flex items-center justify-between">
                <span>Monospace / Code & Terminal Typeface</span>
                <span className="text-cyan-400 font-normal">Active: {currentTypography.monoFont}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {MONO_FONTS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        typography: { ...currentTypography, monoFont: font.id },
                      })
                    }
                    className={`p-3 rounded-xl border text-left transition-all ${
                      currentTypography.monoFont === font.id
                        ? "bg-cyan-500/10 border-cyan-500/60 shadow-md shadow-cyan-500/10"
                        : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-neutral-200">
                        {font.name}
                      </span>
                      {currentTypography.monoFont === font.id && (
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <code className="text-[10px] text-neutral-400 block truncate font-mono">
                      {font.sample}
                    </code>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Fine-tuning: Letter Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300">Letter Spacing (Kerning)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "tight", label: "Tight (-0.02em)" },
                    { id: "normal", label: "Normal (0em)" },
                    { id: "wide", label: "Wide (+0.03em)" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          typography: { ...currentTypography, letterSpacing: s.id },
                        })
                      }
                      className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                        currentTypography.letterSpacing === s.id
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-neutral-900/60 text-neutral-400 border-neutral-800"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300">Heading Font Weight</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "bold", label: "Bold (700)" },
                    { id: "semibold", label: "SemiBold (600)" },
                    { id: "normal", label: "Regular (400)" },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          typography: { ...currentTypography, headingWeight: w.id },
                        })
                      }
                      className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                        currentTypography.headingWeight === w.id
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                          : "bg-neutral-900/60 text-neutral-400 border-neutral-800"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Live Typography Preview Box */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Live Font Pairing Preview
              </span>
              <h3
                className="text-2xl font-bold text-neutral-100"
                style={{
                  fontFamily: currentTypography.headingFont,
                  letterSpacing:
                    currentTypography.letterSpacing === "tight"
                      ? "-0.025em"
                      : currentTypography.letterSpacing === "wide"
                      ? "0.035em"
                      : "0",
                }}
              >
                Architecting Resilient Backend & Distributed Systems
              </h3>
              <p
                className="text-sm text-neutral-300 leading-relaxed"
                style={{ fontFamily: currentTypography.bodyFont }}
              >
                Zero-downtime consensus mechanisms, sub-millisecond p99 database caches, and concurrent event-driven telemetry pipelines implemented in modern Java and C++.
              </p>
              <div
                className="text-xs text-cyan-300 p-2 rounded bg-neutral-900/80 border border-neutral-800"
                style={{ fontFamily: currentTypography.monoFont }}
              >
                [cluster-01] raft: consensus established with 3 peers (term 44)
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: COLOR THEME & PRESETS */}
        {/* ========================================================= */}
        {activeTab === "theme" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Color Theme & Visual Atmosphere
                </h2>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Select from curated smooth Astra-inspired palettes or customize hex values for borders, glow auras, backgrounds, and accents.
              </p>
            </div>

            {/* Curated Presets */}
            <div className="space-y-4">
              <label className="text-xs font-mono font-bold text-neutral-200">
                Curated High-Performance Dark Presets
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = currentTheme.preset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          theme: {
                            preset: preset.id as any,
                            primaryColor: preset.colors.primary,
                            secondaryColor: preset.colors.secondary,
                            accentColor: preset.colors.accent,
                            backgroundColor: preset.colors.bg,
                            cardColor: preset.colors.card,
                          },
                        })
                      }
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-neutral-900 border-cyan-500/70 shadow-lg shadow-cyan-500/10"
                          : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold font-mono text-neutral-100">
                          {preset.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>

                      <p className="text-[11px] text-neutral-400 font-mono mb-3 line-clamp-1">
                        {preset.description}
                      </p>

                      {/* Color dots preview */}
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.colors.primary }}
                          title={`Primary: ${preset.colors.primary}`}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.colors.secondary }}
                          title={`Secondary: ${preset.colors.secondary}`}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.colors.accent }}
                          title={`Accent: ${preset.colors.accent}`}
                        />
                        <div
                          className="w-5 h-5 rounded-md border border-white/20 ml-auto"
                          style={{ backgroundColor: preset.colors.bg }}
                          title={`Background: ${preset.colors.bg}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Hex Pickers */}
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Custom Color Fine-Tuning</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Primary Accent */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400">
                    Primary Accent (Buttons, Highlights)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.primaryColor || "#00f2fe"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", primaryColor: e.target.value },
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTheme.primaryColor || "#00f2fe"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", primaryColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 uppercase"
                    />
                  </div>
                </div>

                {/* Secondary Accent */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400">
                    Secondary Accent (Auroras, Gradients)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.secondaryColor || "#8b5cf6"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", secondaryColor: e.target.value },
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTheme.secondaryColor || "#8b5cf6"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", secondaryColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 uppercase"
                    />
                  </div>
                </div>

                {/* Third Accent */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400">
                    Third Accent (Badges, Status Glows)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.accentColor || "#10b981"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", accentColor: e.target.value },
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTheme.accentColor || "#10b981"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", accentColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 uppercase"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400">
                    Canvas Backdrop Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.backgroundColor || "#05070c"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", backgroundColor: e.target.value },
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTheme.backgroundColor || "#05070c"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", backgroundColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 uppercase"
                    />
                  </div>
                </div>

                {/* Card Surface Color */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400">
                    Card & Surface Container Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.cardColor || "#0a0d15"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", cardColor: e.target.value },
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-neutral-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTheme.cardColor || "#0a0d15"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          theme: { ...currentTheme, preset: "custom", cardColor: e.target.value },
                        })
                      }
                      className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PROFILE & BIO */}
        {/* ========================================================= */}
        {activeTab === "profile" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                Personal Information & Bio
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Configure your display name, headline, bio, and resume link.
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
              <label className="text-xs font-mono text-neutral-400">Short Bio</label>
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
                <label className="text-xs font-mono text-neutral-400">Resume Link / URL</label>
                <input
                  type="text"
                  value={data.personal.resumeUrl}
                  onChange={(e) =>
                    setData({
                      ...data,
                      personal: { ...data.personal, resumeUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: SOCIALS & PROFILES */}
        {/* ========================================================= */}
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

              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-cyan-400 font-semibold block">
                  Codeforces Profile URL & Handle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="url"
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

        {/* ========================================================= */}
        {/* TAB: DSA & CODEFORCES */}
        {/* ========================================================= */}
        {activeTab === "dsa" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                DSA & Competitive Programming Tracker
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Configure your Codeforces handle and problem metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400">Current Rank Tag</label>
                <input
                  type="text"
                  value={data.socials.codeforces.rank}
                  onChange={(e) =>
                    setData({
                      ...data,
                      socials: {
                        ...data.socials,
                        codeforces: { ...data.socials.codeforces, rank: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-neutral-300 font-semibold">
                Topic Mastery Disciplines
              </label>
              <div className="space-y-2">
                {data.competitiveProgramming.topicMastery.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center gap-3 text-xs font-mono"
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
                      className="flex-1 bg-transparent text-neutral-100 outline-none"
                    />
                    <input
                      type="text"
                      value={topic.count}
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
                      className="w-24 text-cyan-400 bg-transparent text-right outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PROJECTS SHOWCASE */}
        {/* ========================================================= */}
        {activeTab === "projects" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Flagship Projects ({data.projects.length})
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Manage your architectural systems, throughput benchmarks, and repositories.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newProject: Project = {
                    id: `project-${Date.now()}`,
                    title: "New Distributed Service",
                    subtitle: "High-Throughput Microservice Architecture",
                    description: "Engineered scalable backend service with distributed transactions.",
                    architecture: ["Event-driven pipeline", "Partitioned in-memory cache"],
                    metrics: [
                      { label: "p99 Latency", value: "< 2.1ms" },
                      { label: "Throughput", value: "35k req/s" },
                    ],
                    tags: ["Java", "Spring Boot", "Redis", "Kafka"],
                    githubUrl: "https://github.com/urfav-masterchief",
                    featured: true,
                    category: "Distributed Systems",
                  };
                  setData({ ...data, projects: [newProject, ...data.projects] });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-500/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((project, pIdx) => (
                <div
                  key={project.id}
                  className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[pIdx].title = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="text-sm font-bold font-mono text-cyan-300 bg-transparent border-b border-neutral-700 outline-none flex-1 max-w-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== pIdx);
                        setData({ ...data, projects: updated });
                      }}
                      className="text-neutral-500 hover:text-red-400 text-xs font-mono flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={project.subtitle}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[pIdx].subtitle = e.target.value;
                      setData({ ...data, projects: updated });
                    }}
                    className="w-full text-xs font-mono text-neutral-300 bg-transparent border-b border-neutral-800 outline-none pb-1"
                  />

                  <textarea
                    rows={2}
                    value={project.description}
                    onChange={(e) => {
                      const updated = [...data.projects];
                      updated[pIdx].description = e.target.value;
                      setData({ ...data, projects: updated });
                    }}
                    className="w-full text-xs font-mono text-neutral-400 bg-neutral-950 p-2 rounded border border-neutral-800 outline-none resize-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <label className="text-[10px] text-neutral-500">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={project.githubUrl}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].githubUrl = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-500">Category Tag</label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].category = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: SKILLS MATRIX */}
        {/* ========================================================= */}
        {activeTab === "skills" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-mono text-neutral-100">
                Skills Matrix & Competencies
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Organize your core skills across languages, backend frameworks, and infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skillCategories.map((category, cIdx) => (
                <div
                  key={cIdx}
                  className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => {
                        const updated = [...data.skillCategories];
                        updated[cIdx].title = e.target.value;
                        setData({ ...data, skillCategories: updated });
                      }}
                      className="font-mono text-xs font-bold text-neutral-100 bg-transparent outline-none"
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
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-cyan-400 border border-neutral-800"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-1.5 rounded bg-neutral-950/80 border border-neutral-800/80 text-xs font-mono"
                      >
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].name = e.target.value;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="flex-1 bg-transparent text-neutral-200 outline-none"
                        />
                        <input
                          type="text"
                          value={skill.level}
                          onChange={(e) => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].level = e.target.value;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="w-24 text-[11px] text-neutral-400 bg-transparent outline-none text-right"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills[sIdx].highlight = !skill.highlight;
                            setData({ ...data, skillCategories: updated });
                          }}
                          className={`px-1 rounded text-[10px] ${
                            skill.highlight ? "text-cyan-400" : "text-neutral-600"
                          }`}
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
                          className="text-neutral-600 hover:text-red-400 px-1"
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

        {/* ========================================================= */}
        {/* TAB: VERCEL DEPLOY */}
        {/* ========================================================= */}
        {activeTab === "deploy" && (
          <div className="bg-[#0b0e14] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono text-neutral-100">
                  Deploy Directly to Vercel
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Seamless production deployment instructions and instant commands.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold font-mono text-cyan-400">
                  Option 1: Deploy with Vercel CLI (1-Command)
                </h4>
                <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                  Run the following command directly from your terminal to link your project and deploy instantly:
                </p>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-cyan-300 flex items-center justify-between">
                  <code>npx vercel --prod</code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold font-mono text-cyan-400">
                  Option 2: Continuous Deployment via GitHub (Recommended)
                </h4>
                <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                  Push your repository to GitHub, and Vercel will deploy automatically on every single commit:
                </p>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-300 space-y-1">
                  <div>git add .</div>
                  <div>git commit -m &quot;feat: sleek fonts, custom theme, layout controls&quot;</div>
                  <div>git push origin main</div>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono">
                  Then connect your repo at <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com/new</a> — it detects Next.js automatically and deploys in under 60 seconds!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
