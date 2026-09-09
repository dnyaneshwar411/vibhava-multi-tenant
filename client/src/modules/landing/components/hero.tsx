'use client';

import { motion } from 'motion/react';
import {
  ArrowRight,
  Play,
  TrendingUp,
  Building2,
  Users,
  Wrench,
  DollarSign,
} from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Ambient gold backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] ambient-gold pointer-events-none" />
      {/* Fade to base */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0F1A] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 border border-gold/25 bg-gold/[0.04] rounded-sm"
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-soft" />
            <span className="text-[11px] font-medium tracking-wide text-gold/90 uppercase">
              Splendor in Stewardship. Precision in Management.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.08] text-white"
          >
            Precision Property
            <br />
            Stewardship for
            <br />
            <span className="text-gold">Enduring Assets.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-white/45 leading-relaxed tracking-tight font-light"
          >
            A unified engine combining traditional stability with modern
            operational mastery across tenants, maintenance, and owner yields.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#cta"
              className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gold text-ink font-semibold text-sm tracking-wide rounded-sm transition-all duration-400 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.5)]"
            >
              Request Access
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#showcase"
              className="group inline-flex items-center gap-2.5 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300"
            >
              <span className="flex items-center justify-center w-9 h-9 border border-white/15 rounded-sm group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-300">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              View Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const properties = [
    { name: 'The Ashford', units: 24, occ: 96, noi: '$486K' },
    { name: 'Marlowe House', units: 18, occ: 100, noi: '$312K' },
    { name: 'Greystone Mews', units: 32, occ: 91, noi: '$598K' },
  ];

  return (
    <div className="relative">
      {/* Gold accent line */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative border border-white/10 rounded-sm bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-gold/60" />
            <span className="text-[10px] text-white/40 font-medium tracking-wide uppercase">
              Vibhava · Portfolio Overview
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gold/70 font-medium tracking-wide">
              LIVE
            </span>
            <span className="text-[10px] text-white/30 tracking-wide">
              Q3 2026
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 lg:p-6">
          {/* Top KPI row */}
          <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden mb-5">
            <KpiCell
              icon={DollarSign}
              label="Total NOI"
              value="$1.40M"
              trend="+12.4%"
            />
            <KpiCell
              icon={Users}
              label="Occupancy"
              value="95.7%"
              trend="+3.1%"
            />
            <KpiCell
              icon={Wrench}
              label="Open Tickets"
              value="7"
              trend="−5 vs LM"
            />
          </div>

          {/* Property table */}
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-4 px-4 py-2.5 bg-white/[0.02] border-b border-white/10">
              {['Property', 'Units', 'Occupancy', 'NOI (YTD)'].map((h) => (
                <span
                  key={h}
                  className="text-[10px] text-white/35 font-medium tracking-wide uppercase"
                >
                  {h}
                </span>
              ))}
            </div>
            {properties.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                className="grid grid-cols-4 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-xs text-white/80 font-medium tracking-tight">
                  {p.name}
                </span>
                <span className="text-xs text-white/40 font-light">{p.units}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden max-w-[60px]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.occ}%` }}
                      transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
                      className="h-full bg-gold/60 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-white/50 font-light">
                    {p.occ}%
                  </span>
                </div>
                <span className="text-xs text-gold/80 font-medium font-serif">
                  {p.noi}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom trend bar */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-gold/60" />
              <span className="text-[10px] text-white/35 font-medium tracking-wide uppercase">
                Net Operating Income · Trailing 12M
              </span>
            </div>
            <span className="text-xs text-gold/80 font-medium font-serif">
              +18.2% YoY
            </span>
          </div>
          <div className="mt-2 flex items-end gap-1 h-10">
            {[40, 52, 48, 61, 55, 68, 72, 65, 78, 82, 88, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.2 + i * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-gold/20 to-gold/60 rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent animate-scan-line" />
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 ambient-gold blur-2xl pointer-events-none" />
    </div>
  );
}

function KpiCell({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-ink-card p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3 text-gold/50" />
        <span className="text-[9px] text-white/35 font-medium tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div className="font-serif text-xl font-semibold text-white">{value}</div>
      <div className="text-[10px] text-gold/60 font-medium mt-0.5">{trend}</div>
    </div>
  );
}