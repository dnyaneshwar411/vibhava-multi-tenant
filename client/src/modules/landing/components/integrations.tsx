'use client';

import { motion } from 'motion/react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const integrations = [
  'Stripe',
  'Plaid',
  'QuickBooks',
  'Xero',
  'Slack',
  'Zapier',
  'HubSpot',
  'Salesforce',
  'Twilio',
  'SendGrid',
  'AWS S3',
  'Okta',
];

export default function Integrations() {
  return (
    <Section id="integrations">
      <SectionHeading
        eyebrow="Integrations"
        title="Plugs into the stack you already run."
        description="Auth, billing, accounting, communications, and analytics — connected in minutes."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border vhx-line sm:grid-cols-3 md:grid-cols-4"
      >
        {integrations.map((name) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="flex h-20 items-center justify-center border-b border-r vhx-line vhx-bg text-sm font-medium tracking-tight vhx-mute transition-colors hover:vhx-ink hover:vhx-surface"
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}