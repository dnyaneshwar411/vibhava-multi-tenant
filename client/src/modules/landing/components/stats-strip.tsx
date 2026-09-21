'use client';

import { motion } from 'motion/react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const stats = [
  { value: '128+', label: 'Tenants onboarded' },
  { value: '8,420', label: 'Units under management' },
  { value: '$184K', label: 'Platform MRR' },
  { value: '99.98%', label: 'Uptime last 90 days' },
];

export default function StatsStrip() {
  return (
    <section className="border-y vhx-line">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-8 sm:grid-cols-4 sm:py-10"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="flex flex-col items-center text-center"
          >
            <div className="text-2xl font-semibold tracking-[-0.03em] vhx-ink sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wider vhx-mute">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}