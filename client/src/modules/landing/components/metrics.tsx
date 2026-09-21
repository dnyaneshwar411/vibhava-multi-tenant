'use client';

import { motion } from 'motion/react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const stats = [
  { value: '25%', label: 'Faster maintenance resolution' },
  { value: '0%', label: 'Multi-tenant data leakage' },
  { value: '<2%', label: 'Target delinquency rate' },
];

export default function Metrics() {
  return (
    <section
      id="impact"
      className="border-t border-zinc-200/70 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500"
          >
            The impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            Numbers that define operational excellence.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-900 dark:bg-zinc-900"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-white p-8 sm:p-10 dark:bg-zinc-950"
            >
              <div className="text-5xl font-semibold tracking-[-0.04em] text-zinc-900 sm:text-6xl dark:text-zinc-50">
                {s.value}
              </div>
              <div className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}