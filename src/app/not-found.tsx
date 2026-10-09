import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070c] text-neutral-100 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
          404 ERROR
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-neutral-100">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed">
          The requested route does not exist or has been restricted in production.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-800 hover:border-cyan-500/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
