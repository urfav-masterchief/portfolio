"use client";

import Link from "next/link";
import { Sliders, Sparkles } from "lucide-react";

export default function FloatingEditorTrigger() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href="/editor"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-cyan-500/60 shadow-2xl backdrop-blur-md transition-all hover:scale-105 duration-200"
        title="Open Interactive Portfolio Editor"
      >
        <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-neutral-950 transition-colors">
          <Sliders className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-mono font-medium text-neutral-300 group-hover:text-cyan-300 pr-1">
          Edit Portfolio
        </span>
      </Link>
    </div>
  );
}
