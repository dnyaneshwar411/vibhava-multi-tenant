'use client';

import { motion } from 'motion/react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const steps = [
  {
    n: '01',
    title: 'Create your workspace',
    body: 'Spin up a root workspace, invite your team, and define your organization structure in a few clicks.',
  },
  {
    n: '02',
    title: 'Onboard tenants',
    body: 'Import portfolios, assign plans, and provision subdomains. Data is isolated per tenant from the first row.',
  },
  {
    n: '03',
    title: 'Ship branded experiences',
    body: 'Customize logos, colors, and email domains. Your tenants see your brand — never ours.',
  },
];

export default function HowItWorks() {
  return (
    <Section id="how">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="How it works"
          title="From signup to first tenant in a day."
          description="No migration headaches, no schema rewrites. Vibhava is designed to be the fastest path from zero to a production multi-tenant product."
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative space-y-10 border-l vhx-line pl-10"
        >
          {steps.map((s) => (
            <motion.li key={s.n} variants={fadeUp} className="relative">
              <span className="absolute -left-[54px] top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border vhx-line vhx-surface text-[11px] font-semibold vhx-ink">
                {s.n}
              </span>
              <h3 className="text-lg font-semibold tracking-tight vhx-ink">
                {s.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed vhx-mute">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}