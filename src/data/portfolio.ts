export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: "Distributed Systems" | "Backend Services" | "Algorithms & Tools" | "Networking";
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Usmaan Khan",
    alias: "Masterchief",
    headline: "Backend & Distributed Systems Engineer",
    shortBio:
      "Passionate software engineer specializing in high-throughput backend architecture, distributed systems, and low-latency system design. Building resilient services with Java and C++ with a strong foundation in data structures & algorithms.",
    location: "India",
    availability: "Open for Full-Time Roles & High-Impact Engineering Projects",
    avatar: "/profile-avatar.png",
    resumeUrl: "#contact",
  },

  socials: {
    github: {
      url: "https://github.com/urfav-masterchief",
      label: "GitHub",
      username: "urfav-masterchief",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/usmaan-khan-a2a88a429/",
      label: "LinkedIn",
      username: "usmaan-khan",
    },
    codeforces: {
      url: "https://codeforces.com/profile/urfav_mani",
      label: "Codeforces",
      username: "urfav_mani",
      rank: "Active Competitor",
      problemsSolved: "500+",
      favoriteTopics: ["Dynamic Programming", "Graphs", "Number Theory", "Binary Search"],
    },
    email: "usmaank022@gmail.com",
  },

  stats: [
    { label: "DSA & CP Problems", value: "600+", change: "+Active" },
    { label: "Core Focus", value: "Java & C++", change: "Systems" },
    { label: "System Uptime Goal", value: "99.99%", change: "Resilience" },
    { label: "P99 Latency Target", value: "< 5ms", change: "Optimized" },
  ],

  skillCategories: [
    {
      title: "Core Languages & Systems",
      icon: "Cpu",
      skills: [
        { name: "Java (17/21)", level: "Advanced", highlight: true },
        { name: "C++ (17/20)", level: "Advanced", highlight: true },
        { name: "C", level: "Proficient" },
        { name: "TypeScript", level: "Proficient" },
        { name: "SQL", level: "Advanced", highlight: true },
        { name: "Bash / Linux", level: "Proficient" },
      ],
    },
    {
      title: "Backend & Microservices",
      icon: "Server",
      skills: [
        { name: "Spring Boot", level: "Advanced", highlight: true },
        { name: "RESTful API Design", level: "Advanced", highlight: true },
        { name: "Microservices", level: "Proficient", highlight: true },
        { name: "gRPC & Protocol Buffers", level: "Intermediate" },
        { name: "Node.js & Express", level: "Proficient" },
        { name: "WebSockets", level: "Proficient" },
      ],
    },
    {
      title: "Databases & In-Memory",
      icon: "Database",
      skills: [
        { name: "PostgreSQL", level: "Advanced", highlight: true },
        { name: "Redis (Cache & Pub/Sub)", level: "Advanced", highlight: true },
        { name: "MySQL", level: "Proficient" },
        { name: "MongoDB", level: "Proficient" },
        { name: "Database Indexing & Tuning", level: "Advanced" },
        { name: "ACID & Transactions", level: "Advanced" },
      ],
    },
    {
      title: "DevOps, Cloud & Architecture",
      icon: "Layers",
      skills: [
        { name: "Docker & Containerization", level: "Advanced", highlight: true },
        { name: "Apache Kafka", level: "Intermediate", highlight: true },
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Linux System Administration", level: "Proficient" },
        { name: "CI/CD Workflows", level: "Proficient" },
        { name: "System Design & Patterns", level: "Advanced", highlight: true },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "distributed-kv-store",
      title: "RaftKV: Distributed In-Memory Key-Value Store",
      subtitle: "Consensus-backed, partitioned distributed data store with WAL",
      category: "Distributed Systems",
      description:
        "Engineered a distributed, fault-tolerant key-value store in C++ implementing the Raft consensus protocol. Features log replication, leader election, persistent write-ahead logging (WAL), and memory-mapped file compaction.",
      architecture: [
        "Heartbeat and term-based leader election protocol with randomized timeouts",
        "AppendEntries RPC pipeline supporting batch log replication and out-of-order recovery",
        "Crash recovery mechanism utilizing disk snapshots and replayable WAL",
      ],
      metrics: [
        { label: "p99 Latency", value: "< 1.8ms" },
        { label: "Throughput", value: "35k req/s" },
        { label: "Consensus", value: "Raft CP" },
      ],
      tags: ["C++20", "Raft", "Multi-Threading", "POSIX Sockets", "WAL", "CMake"],
      githubUrl: "https://github.com/urfav-masterchief/distributed-kv-store",
      liveUrl: "",
      featured: true,
    },
    {
      id: "event-stream-engine",
      title: "OmniStream: High-Throughput Event Broker",
      subtitle: "Kafka-backed asynchronous transaction processing pipeline",
      category: "Backend Services",
      description:
        "Developed a resilient event-driven microservice system in Java & Spring Boot to ingest, deduplicate, and process financial transaction events asynchronously with strict ordering guarantees.",
      architecture: [
        "Distributed idempotency key checking with Redis clusters and Lua atomic scripts",
        "Dead letter queue (DLQ) automated retry with exponential backoff strategy",
        "Optimized connection pooling (HikariCP) and PostgreSQL bulk batching",
      ],
      metrics: [
        { label: "Ingestion Peak", value: "50,000 msg/s" },
        { label: "Availability", value: "99.98%" },
        { label: "Zero Data Loss", value: "At-least-once" },
      ],
      tags: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
      githubUrl: "https://github.com/urfav-masterchief/event-stream-engine",
      liveUrl: "",
      featured: true,
    },
    {
      id: "cp-arena-benchmarker",
      title: "ArenaBench: Algorithmic Stress-Testing Suite",
      subtitle: "Automated testcase generation and dual-solution benchmarking tool",
      category: "Algorithms & Tools",
      description:
        "A desktop and CLI toolkit designed for competitive programmers to stress-test complex graph and dynamic programming solutions against brute-force baselines using random testcase generators.",
      architecture: [
        "Process isolation execution with memory & execution time constraints (RLIMIT)",
        "Automated counterexample detection with diff highlighting and tree visualization",
        "Multi-threaded test runner benchmarking C++ and Java solution speeds",
      ],
      metrics: [
        { label: "Stress Test Rate", value: "1,000 cases/s" },
        { label: "Execution Sandbox", value: "POSIX rlimit" },
        { label: "Supported", value: "C++ & Java" },
      ],
      tags: ["C++", "Java", "DSA", "Linux Internals", "Stress-Testing", "CLI"],
      githubUrl: "https://github.com/urfav-masterchief/PersonalClassroom",
      liveUrl: "",
      featured: true,
    },
    {
      id: "distributed-rate-limiter",
      title: "RateShield: Distributed Token-Bucket Gateway",
      subtitle: "Low-latency API gateway rate limiter with Redis sliding window",
      category: "Networking",
      description:
        "High-performance API rate limiting middleware built with Java and Netty, utilizing Redis sliding-window log algorithms and leaky token buckets to mitigate DDoS attacks and API quota abuse.",
      architecture: [
        "Single-roundtrip Redis Lua script executing atomic sliding window verification",
        "Non-blocking asynchronous I/O server powered by Netty event loops",
        "Client tier-based dynamic quota allocation with adaptive throttling",
      ],
      metrics: [
        { label: "Overhead", value: "< 0.4ms" },
        { label: "Throughput", value: "70k req/s" },
        { label: "Storage Footprint", value: "O(1) Memory" },
      ],
      tags: ["Java", "Netty", "Redis", "Lua Scripts", "System Design", "Microservices"],
      githubUrl: "https://github.com/urfav-masterchief/rate-shield-gateway",
      liveUrl: "",
      featured: false,
    },
  ] as Project[],

  competitiveProgramming: {
    title: "Competitive Programming & Problem Solving",
    subtitle: "Sharpening algorithmic thinking, time complexity optimization, and edge-case mastery.",
    codeforcesHandle: "urfav_mani",
    codeforcesUrl: "https://codeforces.com/profile/urfav_mani",
    stats: [
      { label: "Problems Solved", value: "600+" },
      { label: "Core Contest Languages", value: "C++20 / Java" },
      { label: "Primary Platform", value: "Codeforces & GeeksforGeeks" },
      { label: "Specialty", value: "Graph Theory & Dynamic Programming" },
    ],
    topicMastery: [
      { name: "Dynamic Programming (1D, 2D, Bitmask)", count: "120+ Solved", proficiency: 90 },
      { name: "Graphs (Dijkstra, BFS/DFS, MST, Trees)", count: "110+ Solved", proficiency: 92 },
      { name: "Binary Search & Two Pointers", count: "80+ Solved", proficiency: 95 },
      { name: "Data Structures (Segment Trees, Trie, Heaps)", count: "75+ Solved", proficiency: 85 },
      { name: "Number Theory & Combinatorics", count: "60+ Solved", proficiency: 80 },
    ],
  },

  experience: [
    {
      period: "2023 - Present",
      role: "Backend & Systems Software Developer",
      organization: "Independent & Open Source Projects",
      location: "Remote",
      description: [
        "Designing and developing high-performance server applications in Java and C++.",
        "Engineering distributed protocols, multi-threaded pipelines, and caching layers with Redis and PostgreSQL.",
        "Actively practicing competitive programming, maintaining top algorithmic problem-solving discipline.",
      ],
      technologies: ["Java", "C++", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Kafka"],
    },
    {
      period: "2021 - Present",
      role: "Computer Science & Engineering Studies",
      organization: "University Engineering Curriculum",
      location: "India",
      description: [
        "Deep coursework in Operating Systems, Computer Architecture, Database Management Systems, and Distributed Computing.",
        "Led multiple technical group implementations of networking prototypes and relational database indexing.",
      ],
      technologies: ["Data Structures", "Algorithms", "Operating Systems", "Networking", "Database Internals"],
    },
  ] as ExperienceItem[],
};
