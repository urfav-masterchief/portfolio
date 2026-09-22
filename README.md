# Usman Khan (Masterchief) — Portfolio Website

A modern, high-performance, dark minimalist portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, engineered specifically for a **Backend & Distributed Systems Engineer**.

---

## ⚡ Key Highlights

- **Live Interactive System Console (`SystemTerminal.tsx`)**: Visitors can type CLI commands (`help`, `skills`, `projects`, `codeforces`, `stats`, `ping`, `clear`) or click preset command chips.
- **Dedicated Competitive Programming Showcase (`CompetitiveProgrammingSection.tsx`)**: Spotlight on your **Codeforces** profile (`@urfav-masterchief`), 600+ solved problems, algorithmic topic mastery (DP, Graphs, Trees, Binary Search), and contest discipline.
- **Flagship Distributed Projects (`ProjectsSection.tsx`)**: Cards featuring architectural throughput/latency metrics (`< 1.8ms p99`, `50,000 msg/s`), tech tags, and an interactive **Architecture Deep-Dive Modal**.
- **Categorized Skills Matrix (`SkillsSection.tsx`)**: Systems & Languages, Backend & Microservices, Databases & In-Memory, and DevOps/Cloud.
- **Direct Connect & Socials**: Direct links to **GitHub**, **LinkedIn**, and **Codeforces**, alongside a one-click copy email button with visual confirmation and an interactive contact dispatch form.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio live.

### 2. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ How to Customize Your Information

All portfolio content is centralized in a single, clean file:
👉 **[`src/data/portfolio.ts`](file:///home/urfavmani/Projects/portfolio/src/data/portfolio.ts)**

### Social Links & Profiles
Open `src/data/portfolio.ts` to update your links:
```typescript
socials: {
  github: {
    url: "https://github.com/urfav-masterchief",
    label: "GitHub",
    username: "urfav-masterchief",
  },
  linkedin: {
    url: "https://linkedin.com/in/your-linkedin-id", // Replace with your profile URL
    label: "LinkedIn",
    username: "usman-khan",
  },
  codeforces: {
    url: "https://codeforces.com/profile/urfav-masterchief", // Replace with your handle
    label: "Codeforces",
    username: "urfav-masterchief",
    rank: "Specialist",
    problemsSolved: "600+",
  },
  email: "usmaank022@gmail.com",
}
```

### Adding or Modifying Projects
In `src/data/portfolio.ts`, look for `projects: [...]`. You can add new projects or modify existing ones with your own GitHub repositories, metrics, and architecture descriptions.

---

## 🌐 Free Deployment (Vercel)
Deploy in under 2 minutes:
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Portfolio initial commit"
   git branch -M main
   git remote add origin git@github.com:urfav-masterchief/portfolio.git
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com) (free) and click **Deploy**.
