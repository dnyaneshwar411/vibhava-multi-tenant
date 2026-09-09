'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Header / Branding */}
      <header className="relative z-10 flex justify-between items-center max-w-7xl w-full mx-auto">
        <Link 
          href="/" 
          className="font-serif text-xl tracking-[0.2em] font-semibold text-white hover:opacity-80 transition-opacity"
        >
          VIBHAVA
        </Link>
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono border border-white/10 px-3 py-1 rounded-none">
          ERR_404_NULL_INDEX
        </span>
      </header>

      {/* Centered Main Content */}
      <main className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Subtle Status Pill */}
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3.5 py-1.5 mb-8 text-xs tracking-widest uppercase text-[#D4AF37]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Asset Beyond Boundaries</span>
          </div>

          {/* Large Hero Code */}
          <h1 className="font-serif text-8xl md:text-9xl font-light tracking-tight text-white mb-4">
            404
          </h1>

          {/* Heading Statement */}
          <h2 className="text-2xl md:text-3xl font-serif text-zinc-200 tracking-tight mb-4">
            The requested coordinate does not exist.
          </h2>

          {/* Subtext */}
          <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed mb-10 font-light">
            The record or page you are attempting to inspect may have been relocated, archived, or restricted under tenant access controls.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-6 py-3.5 transition-all hover:bg-zinc-200 rounded-none tracking-wide"
            >
              <Home className="w-4 h-4" />
              Return to Platform
            </Link>

            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 bg-transparent text-white font-medium text-sm px-6 py-3.5 transition-all hover:border-white/40 hover:bg-white/5 rounded-none tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Location
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer Minimal Indicator */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 border-t border-white/10 pt-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Vibhava Security System Active</span>
        </div>
        <p>© 2026 Vibhava Estate Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}