'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="cta"
      className="border-t border-zinc-200/70 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50"
          >
            Elevate your estate management.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            Request access to the Vibhava platform. White-glove onboarding for
            portfolios of 50+ units.
          </motion.p>

          <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-md">
            {submitted ? (
              <div className="flex items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-5 py-3.5 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                Request received. We&apos;ll be in touch within 48 hours.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubmitted(true);
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@estate.com"
                  className="h-10 flex-1 rounded-md border border-zinc-200 bg-white px-3.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                />
                <button
                  type="submit"
                  className="group inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Request access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-500"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" /> No setup fees
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" /> SOC 2 compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3 w-3" /> 48-hour onboarding
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}