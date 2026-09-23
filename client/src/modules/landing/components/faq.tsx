'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const items = [
  {
    q: 'How is tenant data isolated?',
    a: 'Every tenant runs against the same Postgres cluster, but all rows are scoped by a tenant_id and enforced with Feature-level security policies. Cross-tenant queries are structurally impossible through the application layer.',
  },
  {
    q: 'Can tenants use their own domain?',
    a: 'Yes. Each tenant gets a subdomain by default (e.g. ashford.vibhava.io), and Enterprise plans can attach custom apex domains with automatic SSL provisioning.',
  },
  {
    q: 'What does onboarding look like?',
    a: 'You get a sandbox workspace within one business day. Our team helps with data migration, RBAC configuration, and branding. Most teams go live in under two weeks.',
  },
  {
    q: 'Do you offer on-prem or VPC deployment?',
    a: 'Enterprise plans support VPC peering, on-prem deployment, and white-label options. Contact sales for a scoping call.',
  },
  {
    q: 'Is Vibhava SOC 2 compliant?',
    a: 'We are SOC 2 Type II ready and can share the current report and DPA under NDA. Enterprise plans include a signed SLA.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you ask."
          description="Everything procurement, engineering, and ops usually need to know."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="divide-y vhx-divide rounded-xl border vhx-line vhx-bg"
        >
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.q} variants={fadeUp}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                >
                  <span className="text-sm font-medium vhx-ink sm:text-[15px]">
                    {item.q}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border vhx-line vhx-mute">
                    {isOpen ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed vhx-mute">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}