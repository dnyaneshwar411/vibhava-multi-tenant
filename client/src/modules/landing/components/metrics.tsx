'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const stats = [
  {
    value: 25,
    suffix: '%',
    label: 'Faster Maintenance Resolution',
    sublabel: 'Avg time from ticket to close',
  },
  {
    value: 0,
    suffix: '%',
    label: 'Multi-Tenant Data Leakage',
    sublabel: 'Strict RLS isolation enforced',
  },
  {
    value: 2,
    suffix: '%',
    prefix: '<',
    label: 'Target Delinquency Rate',
    sublabel: 'Across entire portfolio',
  },
];

export default function Metrics() {
  return (
    <section
      id="impact"
      className="relative py-24 lg:py-32 border-t border-white/10"
    >
      <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] ambient-gold pointer-events-none" />

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
              The Impact
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white"
          >
            Numbers that define
            <br />
            <span className="text-gold">operational excellence.</span>
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink-card p-8 lg:p-10 text-center group hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="font-serif text-6xl lg:text-7xl font-semibold tracking-tight text-white group-hover:text-gold transition-colors duration-500">
                {stat.prefix && (
                  <span className="text-white/30">{stat.prefix}</span>
                )}
                <Counter value={stat.value} />
                <span className="text-gold">{stat.suffix}</span>
              </div>
              <div className="mt-4 text-sm font-medium text-white/70 tracking-tight">
                {stat.label}
              </div>
              <div className="mt-1.5 text-xs text-white/30 tracking-tight font-light">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1600;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.round(display) : display.toFixed(0)}
    </span>
  );
}
