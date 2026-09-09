'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="relative py-24 lg:py-32 border-t border-white/10">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] ambient-gold pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gold/20 rounded-sm bg-gold/[0.03]"
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-soft" />
            <span className="text-[11px] text-gold/80 tracking-wide font-medium uppercase">
              By Invitation
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-white"
          >
            Elevate Your
            <br />
            <span className="text-gold">Estate Management.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-base text-white/40 leading-relaxed tracking-tight font-light max-w-lg mx-auto"
          >
            Request access to the Vibhava platform. White-glove onboarding for
            portfolios of 50+ units.
          </motion.p>

          {/* Email bar */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-10 max-w-md mx-auto"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 px-6 py-4 border border-gold/25 rounded-sm bg-gold/[0.04] gold-glow"
              >
                <div className="flex items-center justify-center w-6 h-6 bg-gold rounded-full">
                  <Check className="w-4 h-4 text-ink" />
                </div>
                <span className="text-sm text-white tracking-tight">
                  Request received. We&apos;ll be in touch within 48 hours.
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 border border-white/10 rounded-sm bg-white/[0.02] backdrop-blur-sm focus-within:border-gold/30 transition-colors duration-400"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@estate.com"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/25 tracking-tight outline-none font-light"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-ink font-semibold text-sm tracking-wide rounded-sm transition-all duration-400 hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] whitespace-nowrap"
                >
                  Request Access
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex items-center justify-center gap-6 text-xs text-white/25 tracking-tight font-light"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-gold/50" />
              No setup fees
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-gold/50" />
              SOC 2 compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-gold/50" />
              48-hour onboarding
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
