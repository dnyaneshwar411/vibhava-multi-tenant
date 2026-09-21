'use client';

import { motion } from 'motion/react';
import { Button } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

export default function BottomCta() {
  return (
    <section className="border-t vhx-line py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative overflow-hidden rounded-2xl border vhx-line vhx-surface p-10 text-center sm:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[400px] -translate-x-1/2 rounded-full vhx-bg-accent opacity-20 blur-3xl"
          />
          <motion.h2
            variants={fadeUp}
            className="relative text-3xl font-semibold tracking-[-0.035em] vhx-ink sm:text-4xl lg:text-5xl"
          >
            Ship your multi-tenant product
            <br />
            <span className="vhx-text-accent">this quarter.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-lg text-base leading-relaxed vhx-mute"
          >
            Spin up a sandbox workspace, invite your team, and onboard your
            first tenant in under a day.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#onboard" size="lg" arrow>
              Get started
            </Button>
            <Button href="#pricing" variant="secondary" size="lg">
              Compare plans
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}