"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { CodeforcesIcon } from "@/components/Icons";
import {
  Trophy,
  ExternalLink,
  Flame,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

interface DifficultyTier {
  id: string;
  label: string;
  level: string;
  color: string;
  target: number;
  count: number;
}

interface SolvedProblem {
  id?: string;
  name: string;
  contestId: number;
  index: string;
  rating: number;
  language: string;
}

export default function CompetitiveProgrammingSection() {
  const handle = PORTFOLIO_DATA.socials.codeforces.username || "urfav_mani";
  const [loading, setLoading] = useState(false);
  const [totalSolved, setTotalSolved] = useState<number>(4);
  const [tiers, setTiers] = useState<DifficultyTier[]>([
    { id: "tier-800", label: "800 – 999", level: "Foundational", color: "emerald", target: 20, count: 4 },
    { id: "tier-1000", label: "1000 – 1199", level: "Easy / Core", color: "cyan", target: 15, count: 0 },
    { id: "tier-1200", label: "1200 – 1399", level: "Intermediate", color: "blue", target: 15, count: 0 },
    { id: "tier-1400", label: "1400 – 1599", level: "Challenging", color: "violet", target: 10, count: 0 },
    { id: "tier-1600", label: "1600+", level: "Hard / Advanced", color: "amber", target: 10, count: 0 },
  ]);
  const [recentSolved, setRecentSolved] = useState<SolvedProblem[]>([
    { name: "Bit++", rating: 800, language: "Java 21", contestId: 282, index: "A" },
    { name: "Team", rating: 800, language: "Java 21", contestId: 231, index: "A" },
    { name: "Way Too Long Words", rating: 800, language: "Java 21", contestId: 71, index: "A" },
    { name: "Watermelon", rating: 800, language: "Java 21", contestId: 4, index: "A" },
  ]);

  const fetchLiveStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/codeforces?handle=${handle}`);
      const data = await res.json();
      if (data && data.tiers) {
        setTotalSolved(data.totalSolved || 4);
        setTiers(data.tiers);
        if (data.recentSolved && data.recentSolved.length > 0) {
          setRecentSolved(data.recentSolved);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live Codeforces stats, using cached data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStats();
  }, [handle]);

  // Overall milestone calculation (Target: 25 problems for Bronze Milestone)
  const milestoneTarget = 25;
  const milestonePercent = Math.min(Math.round((totalSolved / milestoneTarget) * 100), 100);

  const tierColors: Record<string, { bar: string; badge: string; text: string }> = {
    emerald: {
      bar: "from-emerald-500 to-teal-400",
      badge: "bg-emerald-950/40 text-emerald-300 border-emerald-500/30",
      text: "text-emerald-400",
    },
    cyan: {
      bar: "from-cyan-500 to-sky-400",
      badge: "bg-cyan-950/40 text-cyan-300 border-cyan-500/30",
      text: "text-cyan-400",
    },
    blue: {
      bar: "from-blue-500 to-indigo-400",
      badge: "bg-blue-950/40 text-blue-300 border-blue-500/30",
      text: "text-blue-400",
    },
    violet: {
      bar: "from-violet-500 to-purple-400",
      badge: "bg-violet-950/40 text-violet-300 border-violet-500/30",
      text: "text-violet-400",
    },
    amber: {
      bar: "from-amber-500 to-yellow-400",
      badge: "bg-amber-950/40 text-amber-300 border-amber-500/30",
      text: "text-amber-400",
    },
  };

  return (
    <section id="competitive-programming" className="py-24 relative border-t border-neutral-800/60">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[350px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4" />
              <span>Algorithmic Rigor & Practice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 tracking-tight">
              Codeforces Problem Solving Progress
            </h2>
            <p className="text-neutral-400 mt-2 max-w-2xl text-sm leading-relaxed">
              Real-time tracker of solved problems across rating difficulties. Progress bars fill dynamically as solutions are accepted in Java & C++.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchLiveStats}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-cyan-300 text-xs font-mono border border-neutral-800 transition-colors"
              title="Sync latest submissions from Codeforces"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span>{loading ? "Syncing..." : "Sync Stats"}</span>
            </button>

            <a
              href={`https://codeforces.com/profile/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-all shadow-lg shadow-cyan-950/40"
            >
              <CodeforcesIcon className="w-4 h-4" />
              <span>@{handle}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Milestone Card */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0b0e17] via-[#0e121e] to-[#0b0e17] border border-cyan-500/30 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-mono text-base font-bold text-neutral-100 flex items-center gap-2">
                  <span>Milestone 1: Road to 25 Problems</span>
                  <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
                    Active
                  </span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Building fundamental intuition in implementation, brute-force optimization, and boundary checks.
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 font-mono self-start sm:self-auto">
              <span className="text-2xl font-bold text-cyan-300">{totalSolved}</span>
              <span className="text-sm text-neutral-500">/ {milestoneTarget} Solved</span>
              <span className="text-xs text-emerald-400 font-semibold ml-1">({milestonePercent}%)</span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-neutral-900 border border-neutral-800/80 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-700 shadow-sm"
                style={{ width: `${Math.max(milestonePercent, 6)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-neutral-500 px-1">
              <span>0 Solved</span>
              <span>10 Solved</span>
              <span>20 Solved</span>
              <span className="text-cyan-400">25 Solved Goal 🏁</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Difficulty Bars & Recent Accepted Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Difficulty Tier Progress Bars */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#0a0d15] border border-neutral-800/90 space-y-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Problem Difficulty Tiers
              </h3>
              <span className="text-[11px] font-mono text-neutral-500">
                Codeforces Rating Scale
              </span>
            </div>

            <div className="space-y-5">
              {tiers.map((tier) => {
                const colors = tierColors[tier.color] || tierColors.cyan;
                const percentage = Math.min(Math.round((tier.count / tier.target) * 100), 100);

                return (
                  <div key={tier.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-200 font-semibold">
                          Rating {tier.label}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${colors.badge}`}>
                          {tier.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${tier.count > 0 ? colors.text : "text-neutral-500"}`}>
                          {tier.count} solved
                        </span>
                        <span className="text-neutral-600">/ {tier.target} goal</span>
                      </div>
                    </div>

                    {/* Difficulty Tier Bar */}
                    <div className="w-full h-2.5 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Next Challenge Target:
              </span>
              <span className="text-cyan-300 font-medium">Rating 1000 Problems</span>
            </div>
          </div>

          {/* Recent Accepted Problems Showcase */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0a0d15] border border-neutral-800/90 space-y-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Accepted Solutions
              </h3>
              <span className="text-xs font-mono text-neutral-500">
                Verified on CF
              </span>
            </div>

            <div className="space-y-3">
              {recentSolved.map((prob, idx) => (
                <a
                  key={idx}
                  href={`https://codeforces.com/contest/${prob.contestId}/problem/${prob.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-neutral-200 group-hover:text-cyan-300 transition-colors">
                        {prob.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                        {prob.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                      <span>Problem {prob.contestId}{prob.index}</span>
                      <span>•</span>
                      <span className="text-neutral-400">{prob.language}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>AC</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-2 text-center">
              <a
                href={`https://codeforces.com/submissions/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
              >
                <span>View submission history on Codeforces</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
