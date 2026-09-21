'use client';

import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const rows = [
  { label: 'Per-tenant data isolation', vhx: true, legacy: false },
  { label: 'Subdomain routing with auto-SSL', vhx: true, legacy: false },
  { label: 'Role-based access control', vhx: true, legacy: 'partial' },
  { label: 'Custom branding per tenant', vhx: true, legacy: false },
  { label: 'Typed REST + webhooks', vhx: true, legacy: 'partial' },
  { label: 'On-prem or VPC deployment', vhx: true, legacy: false },
  { label: 'SLA + named CSM', vhx: true, legacy: false },
];

function Cell({ value }: { value: boolean | 'partial' }) {
  if (value === true)
    return <Check className="mx-auto h-4 w-4 vhx-text-accent" strokeWidth={3} />;
  if (value === 'partial')
    return <Minus className="mx-auto h-4 w-4 vhx-mute" strokeWidth={3} />;
  return <Minus className="mx-auto h-4 w-4 text-zinc-300 dark:text-zinc-700" strokeWidth={3} />;
}

export default function Comparison() {
  return (
    <Section id="compare">
      <SectionHeading
        eyebrow="Comparison"
        title="Why teams switch to Vibhava."
        description="The features you'd have to build yourself — or cobble together from four different vendors."
        align="center"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border vhx-line vhx-bg"
      >
        <div className="grid grid-cols-[1fr_120px_120px] border-b vhx-line vhx-surface px-5 py-3 text-[11px] uppercase tracking-wider vhx-mute">
          <span>Capability</span>
          <span className="text-center">Vibhava</span>
          <span className="text-center">Legacy tools</span>
        </div>
        {rows.map((r) => (
          <motion.div
            key={r.label}
            variants={fadeUp}
            className="grid grid-cols-[1fr_120px_120px] items-center border-b vhx-line px-5 py-3.5 text-[13px] last:border-0"
          >
            <span className="vhx-ink">{r.label}</span>
            <span>
              <Cell value={r.vhx} />
            </span>
            <span>
              <Cell value={r.legacy as boolean | 'partial'} />
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}