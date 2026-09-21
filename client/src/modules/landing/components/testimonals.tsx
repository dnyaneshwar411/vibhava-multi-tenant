'use client';

import { motion } from 'motion/react';
import { Section, SectionHeading, SurfaceCard } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const featured = {
  quote:
    'We replaced three internal services with Vibhava in a single sprint. Tenancy, RBAC, and branding are just… there.',
  name: 'Priya Raman',
  role: 'VP Engineering, Northwind Realty',
};

const quotes = [
  {
    quote: 'Subdomain routing saved us six weeks of work.',
    name: 'Marcus Lee',
    role: 'CTO, Helios Property Group',
  },
  {
    quote: 'Our tenants log in and see our brand, not Vibhava’s.',
    name: 'Anika Sharma',
    role: 'Head of Product, Lumen Estates',
  },
  {
    quote: 'RBAC out of the box meant we shipped to enterprise in Q1.',
    name: 'Daniel Osei',
    role: 'Founder, Paragon Ops',
  },
  {
    quote: 'Audit logs and SLAs got us through procurement in a week.',
    name: 'Sofia Marchetti',
    role: 'COO, Meridian Holdings',
  },
];

export default function Testimonials() {
  return (
    <Section id="customers">
      <SectionHeading
        eyebrow="Customers"
        title="Teams shipping multi-tenant products on Vibhava."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-14 grid gap-4 md:grid-cols-3"
      >
        <motion.div variants={fadeUp} className="md:col-span-2">
          <SurfaceCard className="flex h-full flex-col justify-between p-8 sm:p-10">
            <p className="text-xl leading-relaxed tracking-tight vhx-ink sm:text-2xl">
              “{featured.quote}”
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/priya-raman.jpg" />
                <AvatarFallback className="vhx-bg-accent text-black font-semibold">PR</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium vhx-ink">
                  {featured.name}
                </div>
                <div className="text-xs vhx-mute">{featured.role}</div>
              </div>
            </div>
          </SurfaceCard>
        </motion.div>

        <div className="grid gap-4 md:col-span-1">
          {quotes.slice(0, 2).map((q) => (
            <motion.div key={q.name} variants={fadeUp}>
              <SurfaceCard className="p-6">
                <p className="text-sm leading-relaxed vhx-ink">“{q.quote}”</p>
                <div className="mt-4 text-xs vhx-mute">
                  <span className="font-medium vhx-ink">{q.name}</span> ·{' '}
                  {q.role}
                </div>
              </SurfaceCard>
            </motion.div>
          ))}
        </div>

        {quotes.slice(2).map((q) => (
          <motion.div key={q.name} variants={fadeUp} className="md:col-span-1.5">
            <SurfaceCard className="h-full p-6">
              <p className="text-sm leading-relaxed vhx-ink">“{q.quote}”</p>
              <div className="mt-4 text-xs vhx-mute">
                <span className="font-medium vhx-ink">{q.name}</span> · {q.role}
              </div>
            </SurfaceCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}