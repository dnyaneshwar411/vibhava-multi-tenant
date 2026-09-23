'use client';

import { motion } from 'motion/react';
import {
  Boxes,
  Globe2,
  ShieldCheck,
  Palette,
  Layers,
  GitBranch,
} from 'lucide-react';
import { Section, SectionHeading, SurfaceCard } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const features = [
  {
    icon: ShieldCheck,
    title: 'Tenant isolation',
    body: 'Feature-level security scoped per workspace. No shared state, no leakage, ever.',
    span: 'md:col-span-2',
  },
  {
    icon: Globe2,
    title: 'Subdomain routing',
    body: 'Every tenant gets a first-class subdomain with automatic SSL.',
    span: '',
  },
  {
    icon: Layers,
    title: 'Workspaces',
    body: 'Group portfolios, teams, and billing under a single workspace model.',
    span: '',
  },
  {
    icon: Boxes,
    title: 'RBAC',
    body: 'Role-based access from owner to vendor to tenant, with audit trails.',
    span: 'md:col-span-2',
  },
  // {
  //   icon: Palette,
  //   title: 'Custom branding',
  //   body: 'Per-tenant logos, colors, and email domains — configured in minutes.',
  //   span: '',
  // },
  // {
  //   icon: GitBranch,
  //   title: 'API & webhooks',
  //   body: 'Compose Vibhava into your existing stack with typed REST and events.',
  //   span: '',
  // },
];

export default function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Architecture"
        title="Built multi-tenant from line one."
        description="Every primitive you need to onboard organizations, isolate data, and ship branded experiences — without rebuilding auth, tenancy, or billing."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={fadeUp} className={f.span}>
            <SurfaceCard className="h-full p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md vhx-bg-accent">
                <f.icon className="h-4 w-4 text-zinc-950" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight vhx-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed vhx-mute">{f.body}</p>
            </SurfaceCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}