'use client';
import { motion } from 'motion/react';
import {
  DollarSign,
  KanbanSquare,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const values = [
  {
    icon: DollarSign,
    title: 'Financial Automation',
    from: 'Manual rent tracking',
    to: 'Automated balance ledgers & P&L statements',
    description:
      'Reconcile rent, fees, and owner distributions in real time. Every dollar accounted for, every statement audit-ready.',
  },
  {
    icon: KanbanSquare,
    title: 'Maintenance Dispatch',
    from: 'Delayed repair calls',
    to: 'Real-time Kanban triage',
    description:
      'Tenants submit, vendors dispatch, and you watch every ticket move from request to resolution on a single board.',
  },
  {
    icon: BarChart3,
    title: 'Owner Visibility',
    from: 'Scattered reports',
    to: 'Real-time asset analytics',
    description:
      'Owners see live NOI, occupancy, and delinquency across every property — no waiting for quarterly PDFs.',
  },
];

export default function ValueProps() {
  return (
    <section id="value" className="relative py-24 lg:py-32 border-t border-white/10">
      <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/10 rounded-sm bg-white/[0.02]"
          >
            <span className="text-[11px] text-white/45 tracking-wide font-medium uppercase">
              The Shift
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white"
          >
            From manual chaos
            <br />
            to <span className="text-gold">operational mastery.</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 grid md:grid-cols-3 gap-5"
        >
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-white/10 rounded-sm p-7 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-500 gold-glow-hover"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 border border-gold/20 bg-gold/[0.04] rounded-sm mb-6 group-hover:border-gold/40 group-hover:bg-gold/[0.08] transition-all duration-500">
                <item.icon className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors duration-500" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-white tracking-tight">
                {item.title}
              </h3>

              {/* Transition */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 font-medium tracking-wide uppercase">
                    From
                  </span>
                  <span className="text-xs text-white/40 line-through decoration-white/20">
                    {item.from}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-gold/50" />
                  <span className="text-xs text-gold/80 font-medium">
                    {item.to}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm text-white/40 leading-relaxed tracking-tight font-light">
                {item.description}
              </p>

              {/* Gold accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}