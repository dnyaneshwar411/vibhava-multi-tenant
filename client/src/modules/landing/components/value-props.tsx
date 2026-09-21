'use client';

import { motion } from 'motion/react';
import { DollarSign, KanbanSquare, BarChart3 } from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const values = [
  {
    icon: DollarSign,
    title: 'Financial automation',
    description:
      'Reconcile rent, fees, and owner distributions in real time. Every statement audit-ready.',
  },
  {
    icon: KanbanSquare,
    title: 'Maintenance dispatch',
    description:
      'Tenants submit, vendors dispatch, and every ticket moves from request to resolution on one board.',
  },
  {
    icon: BarChart3,
    title: 'Owner visibility',
    description:
      'Live NOI, occupancy, and delinquency across every property — no waiting for quarterly PDFs.',
  },
];

export default function ValueProps() {
  return (
    <section id="value" className="border-t border-zinc-200/70 py-24 sm:py-32 dark:border-zinc-900">
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
            The shift
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            From manual chaos to operational mastery.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid-cols-3 dark:border-zinc-900 dark:bg-zinc-900"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="bg-white p-7 dark:bg-zinc-950"
            >
              <v.icon
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                strokeWidth={1.75}
              />
              <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {v.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}