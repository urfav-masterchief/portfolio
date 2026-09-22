"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play } from "lucide-react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function SystemTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "systems --status",
      output: (
        <div className="space-y-1 text-xs text-neutral-300">
          <p className="text-emerald-400 font-semibold">● System Core: OPERATIONAL</p>
          <p className="text-neutral-400">
            [Runtime: Java 21 / C++20 | Host: Linux x86_64 | Latency: 1.4ms]
          </p>
          <p className="text-neutral-400">
            Type <span className="text-cyan-400 font-mono font-bold">help</span> or click quick commands below to inspect architecture and skills.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p className="text-cyan-300 font-semibold mb-1">Available Commands:</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">skills</span> - Display key technical competencies & languages</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">projects</span> - List flagship distributed & backend projects</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">codeforces</span> - View competitive programming rating & stats</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">stats</span> - View system performance and problem-solving metrics</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">contact</span> - Show direct outreach channels</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">ping</span> - Measure simulated microservice roundtrip latency</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">clear</span> - Clear terminal output</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="text-xs space-y-1.5 text-neutral-300">
            <p className="text-cyan-300 font-semibold">Core Tech Stack:</p>
            <p><span className="text-neutral-400">Languages:</span> Java (21), C++ (17/20), C, SQL, TypeScript, Bash</p>
            <p><span className="text-neutral-400">Backend:</span> Spring Boot, Microservices, REST APIs, gRPC, Netty, Node.js</p>
            <p><span className="text-neutral-400">Databases & Cache:</span> PostgreSQL, Redis, MySQL, MongoDB, HikariCP</p>
            <p><span className="text-neutral-400">Infra & Arch:</span> Docker, Apache Kafka, Linux, Git, Raft Consensus, Distributed Locks</p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="text-xs space-y-2 text-neutral-300">
            {PORTFOLIO_DATA.projects.slice(0, 3).map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/60 pl-2">
                <span className="text-cyan-400 font-semibold">{p.title}</span>
                <span className="text-neutral-500 ml-2">[{p.category}]</span>
                <p className="text-neutral-400 mt-0.5">{p.subtitle}</p>
                <div className="flex gap-2 text-[11px] text-neutral-500 mt-1">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="bg-neutral-800/80 px-1.5 py-0.5 rounded text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "codeforces":
        outputNode = (
          <div className="text-xs space-y-1.5 text-neutral-300">
            <p className="text-cyan-300 font-semibold">Codeforces Competitive Profile:</p>
            <p>Handle: <span className="text-cyan-400 font-mono">@{PORTFOLIO_DATA.socials.codeforces.username}</span></p>
            <p>Problems Solved: <span className="text-emerald-400 font-bold">{PORTFOLIO_DATA.competitiveProgramming.stats[0].value}</span></p>
            <p>Core Contest Languages: <span className="text-neutral-200">C++20 / Java</span></p>
            <p>Key Topics: <span className="text-neutral-400">Dynamic Programming, Graph Theory, Segment Trees, Number Theory</span></p>
            <a
              href={PORTFOLIO_DATA.socials.codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-cyan-400 underline text-[11px]"
            >
              Open Profile &rarr;
            </a>
          </div>
        );
        break;

      case "stats":
        outputNode = (
          <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 my-1">
            {PORTFOLIO_DATA.stats.map((s) => (
              <div key={s.label} className="bg-neutral-800/60 p-2 rounded border border-neutral-700/50">
                <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">{s.label}</span>
                <span className="text-cyan-300 font-bold font-mono text-sm">{s.value}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p>Email: <span className="text-cyan-400 font-mono">{PORTFOLIO_DATA.socials.email}</span></p>
            <p>GitHub: <a href={PORTFOLIO_DATA.socials.github.url} target="_blank" rel="noreferrer" className="text-neutral-400 underline">{PORTFOLIO_DATA.socials.github.url}</a></p>
            <p>LinkedIn: <a href={PORTFOLIO_DATA.socials.linkedin.url} target="_blank" rel="noreferrer" className="text-neutral-400 underline">{PORTFOLIO_DATA.socials.linkedin.url}</a></p>
            <p>Codeforces: <a href={PORTFOLIO_DATA.socials.codeforces.url} target="_blank" rel="noreferrer" className="text-neutral-400 underline">{PORTFOLIO_DATA.socials.codeforces.url}</a></p>
          </div>
        );
        break;

      case "ping":
        outputNode = (
          <div className="text-xs space-y-1 text-neutral-300 font-mono">
            <p>64 bytes from backend.internal (10.0.0.42): icmp_seq=1 ttl=64 time=1.12 ms</p>
            <p>64 bytes from backend.internal (10.0.0.42): icmp_seq=2 ttl=64 time=1.24 ms</p>
            <p>64 bytes from backend.internal (10.0.0.42): icmp_seq=3 ttl=64 time=0.98 ms</p>
            <p className="text-emerald-400 mt-1">--- 0% packet loss, rtt min/avg/max = 0.98/1.11/1.24 ms ---</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        outputNode = (
          <p className="text-xs text-red-400">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-cyan-400 font-bold">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  const quickCommands = ["help", "skills", "projects", "codeforces", "stats", "ping"];

  return (
    <div className="w-full rounded-xl bg-[#090b10] border border-neutral-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="bg-[#0f121a] px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs text-neutral-400 ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            usman@systems-node:~
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
          <span className="hidden sm:inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            zsh / bash
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-3.5 text-sm bg-neutral-950/60">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-cyan-400">masterchief@engine</span>
              <span className="text-neutral-500">:</span>
              <span className="text-violet-400">~</span>
              <span className="text-neutral-400">$</span>
              <span className="text-neutral-100 font-medium">{item.command}</span>
            </div>
            <div className="pl-3">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input Form */}
      <div className="border-t border-neutral-800/80 bg-[#0d1017] p-3">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-xs font-mono">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'codeforces'..."
            className="flex-1 bg-transparent text-neutral-200 text-xs font-mono outline-none placeholder:text-neutral-600"
          />
          <button
            onClick={() => executeCommand(input)}
            className="px-2.5 py-1 text-xs rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            <span>Run</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-800/50">
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
            Quick:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-cyan-300 border border-neutral-800 hover:border-cyan-500/30 transition-all font-mono"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={() => executeCommand("clear")}
            className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-red-400 border border-neutral-800 transition-all font-mono ml-auto"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
