'use client';

import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import Footer from '@/modules/landing/components/footer';
import Navbar from '@/modules/landing/components/navbar';
import { Section, SurfaceCard } from '@/modules/landing/components/primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export default function LegalDocument({
  title,
  eyebrow,
  updated,
  intro,
  sections,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative min-h-screen vhx-bg vhx-ink antialiased">
      <Navbar />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 60% 55% at 50% 0%, #000 35%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 55% at 50% 0%, #000 35%, transparent 100%)',
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mx-auto max-w-3xl px-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border vhx-line vhx-surface px-3 py-1 text-xs vhx-mute"
          >
            <span className="h-1.5 w-1.5 rounded-full vhx-bg-accent" />
            {eyebrow}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] vhx-ink sm:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm vhx-mute"
          >
            Last updated · <span className="vhx-ink">{updated}</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed vhx-mute"
          >
            {intro}
          </motion.p>
        </motion.div>
      </section>

      {/* ---------- Document body ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider vhx-mute">
                <FileText className="h-3.5 w-3.5" />
                On this page
              </div>
              <nav className="mt-5 space-y-2.5 border-l vhx-line pl-4">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[13px] leading-snug vhx-mute transition-colors hover:vhx-ink"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-3xl space-y-10"
          >
            {sections.map((s) => (
              <motion.article
                key={s.id}
                id={s.id}
                variants={fadeUp}
                className="scroll-mt-24"
              >
                <h2 className="text-lg font-semibold tracking-[-0.02em] vhx-ink sm:text-xl">
                  {s.title}
                </h2>

                {s.paragraphs?.length ? (
                  <div className="mt-4 space-y-4">
                    {s.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] leading-relaxed vhx-mute"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}

                {s.bullets?.length ? (
                  <SurfaceCard
                    hover={false}
                    className="mt-5 p-5"
                  >
                    <ul className="space-y-3">
                      {s.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[14px] leading-relaxed vhx-mute"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full vhx-bg-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </SurfaceCard>
                ) : null}
              </motion.article>
            ))}

            {/* Footer note */}
            <motion.div
              variants={fadeUp}
              className="border-t vhx-line pt-8 text-sm vhx-mute"
            >
              Questions about this document? Reach us at{' '}
              <a
                href="mailto:legal@vibhava.estate"
                className="vhx-text-accent underline-offset-4 hover:underline"
              >
                legal@vibhava.estate
              </a>
              .
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}