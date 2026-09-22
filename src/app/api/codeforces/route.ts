import { NextRequest, NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle") || "urfav_mani";

  try {
    // 1. Fetch user status / submissions from Codeforces API
    const [statusRes, infoRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`, {
        next: { revalidate: 300 },
      }),
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
        next: { revalidate: 300 },
      }),
    ]);

    const statusData = await statusRes.json();
    const infoData = await infoRes.json();

    if (statusData.status !== "OK") {
      throw new Error(statusData.comment || "Failed to fetch submissions");
    }

    const solvedProblems = new Map<string, any>();
    const submissions = statusData.result || [];

    for (const sub of submissions) {
      if (sub.verdict === "OK" && sub.problem) {
        const key = `${sub.problem.contestId}_${sub.problem.index}`;
        if (!solvedProblems.has(key)) {
          solvedProblems.set(key, {
            id: key,
            name: sub.problem.name,
            contestId: sub.problem.contestId,
            index: sub.problem.index,
            rating: sub.problem.rating || 800,
            tags: sub.problem.tags || [],
            language: sub.programmingLanguage || "Java",
            submissionTime: sub.creationTimeSeconds,
          });
        }
      }
    }

    const solvedList = Array.from(solvedProblems.values());
    const totalSolved = solvedList.length;

    // Difficulty tiers with milestone targets
    const tiers = [
      {
        id: "tier-800",
        label: "800 – 999",
        level: "Foundational",
        color: "emerald",
        target: 20,
        count: 0,
      },
      {
        id: "tier-1000",
        label: "1000 – 1199",
        level: "Easy / Core",
        color: "cyan",
        target: 15,
        count: 0,
      },
      {
        id: "tier-1200",
        label: "1200 – 1399",
        level: "Intermediate",
        color: "blue",
        target: 15,
        count: 0,
      },
      {
        id: "tier-1400",
        label: "1400 – 1599",
        level: "Challenging",
        color: "violet",
        target: 10,
        count: 0,
      },
      {
        id: "tier-1600",
        label: "1600+",
        level: "Hard / Advanced",
        color: "amber",
        target: 10,
        count: 0,
      },
    ];

    for (const p of solvedList) {
      const r = p.rating;
      if (r < 1000) tiers[0].count++;
      else if (r < 1200) tiers[1].count++;
      else if (r < 1400) tiers[2].count++;
      else if (r < 1600) tiers[3].count++;
      else tiers[4].count++;
    }

    const userInfo = infoData.status === "OK" ? infoData.result[0] : null;

    return NextResponse.json({
      status: "OK",
      handle,
      totalSolved,
      rating: userInfo?.rating || 0,
      maxRating: userInfo?.maxRating || 0,
      rank: userInfo?.rank || "Newbie / Practice",
      tiers,
      recentSolved: solvedList.slice(0, 6),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    // Graceful fallback with currently verified data
    return NextResponse.json({
      status: "FALLBACK",
      handle,
      totalSolved: 4,
      rating: 0,
      maxRating: 0,
      rank: "Active Competitor",
      tiers: [
        { id: "tier-800", label: "800 – 999", level: "Foundational", color: "emerald", target: 20, count: 4 },
        { id: "tier-1000", label: "1000 – 1199", level: "Easy / Core", color: "cyan", target: 15, count: 0 },
        { id: "tier-1200", label: "1200 – 1399", level: "Intermediate", color: "blue", target: 15, count: 0 },
        { id: "tier-1400", label: "1400 – 1599", level: "Challenging", color: "violet", target: 10, count: 0 },
        { id: "tier-1600", label: "1600+", level: "Hard / Advanced", color: "amber", target: 10, count: 0 },
      ],
      recentSolved: [
        { name: "Bit++", rating: 800, language: "Java 21", contestId: 282, index: "A" },
        { name: "Team", rating: 800, language: "Java 21", contestId: 231, index: "A" },
        { name: "Way Too Long Words", rating: 800, language: "Java 21", contestId: 71, index: "A" },
        { name: "Watermelon", rating: 800, language: "Java 21", contestId: 4, index: "A" },
      ],
      lastUpdated: new Date().toISOString(),
      note: "Loaded from cached profile data",
    });
  }
}
