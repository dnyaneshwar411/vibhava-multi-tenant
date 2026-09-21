'use client';

import { motion } from 'motion/react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const logos = ['NORTHWIND', 'ACME', 'LUMEN', 'HELIOS', 'PARAGON', 'MERIDIAN'];

export default function LogoBar() {
  return (
    <section className="py-16 sm:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-center text-[11px] uppercase tracking-wider vhx-mute"
        >
          Trusted by operators managing 500K+ units
        </motion.p>
        <motion.div
          variants={stagger}
          className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6"
        >
          {logos.map((l) => (
            <motion.div
              key={l}
              variants={fadeUp}
              className="flex items-center justify-center text-sm font-semibold tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-300"
            >
              {l}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}