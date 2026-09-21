'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

type Currency = 'INR' | 'USD';
type Cycle = 'monthly' | 'annually';

type Plan = {
  name: string;
  tagline: string;
  prices: {
    INR: { monthly: number; annually: number } | null;
    USD: { monthly: number; annually: number } | null;
  };
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For small operators getting off spreadsheets.',
    prices: {
      INR: { monthly: 2000, annually: 20000 },
      USD: { monthly: 25, annually: 250 },
    },
    features: [
      'Up to 3 tenants',
      'Up to 50 units',
      'Subdomain routing',
      'Email support',
    ],
    cta: 'Start free trial',
  },
  {
    name: 'Professional',
    tagline: 'For growing property managers with multiple portfolios.',
    prices: {
      INR: { monthly: 10000, annually: 100000 },
      USD: { monthly: 125, annually: 1250 },
    },
    features: [
      'Up to 25 tenants',
      'Up to 1,000 units',
      'RBAC + audit logs',
      'Custom branding',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For national operators and REIT-scale portfolios.',
    prices: {
      INR: { monthly: 25000, annually: 250000 },
      USD: { monthly: 300, annually: 3000 },
    },
    features: [
      'Unlimited tenants',
      'Unlimited units',
      'SSO + SCIM',
      'Dedicated infra',
      'SLA + CSM',
    ],
    cta: 'Contact sales',
  },
  {
    name: 'Custom',
    tagline: 'Bespoke deployments, on-prem, or white-label.',
    prices: { INR: null, USD: null },
    features: [
      'Custom contracts',
      'On-prem / VPC',
      'White-label option',
      'Solutions engineering',
    ],
    cta: 'Talk to us',
  },
];

function formatPrice(currency: Currency, amount: number) {
  return currency === 'INR'
    ? `₹${amount.toLocaleString('en-IN')}`
    : `$${amount.toLocaleString('en-US')}`;
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [cycle, setCycle] = useState<Cycle>('monthly');

  return (
    <Section id="pricing">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing, scaled to your portfolio."
          description="Two currencies, two cycles, zero hidden fees. Switch anytime."
        />
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            value={currency}
            onChange={(v) => setCurrency(v as Currency)}
            options={[
              { value: 'INR', label: 'INR ₹' },
              { value: 'USD', label: 'USD $' },
            ]}
          />
          <Segmented
            value={cycle}
            onChange={(v) => setCycle(v as Cycle)}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annually', label: 'Annually' },
            ]}
          />
          {cycle === 'annually' && (
            <span className="inline-flex items-center gap-1.5 rounded-full vhx-bg-accent px-2.5 py-1 text-[11px] font-semibold text-zinc-950">
              16% off
            </span>
          )}
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {plans.map((p) => (
          <PlanCard key={p.name} plan={p} currency={currency} cycle={cycle} />
        ))}
      </motion.div>
    </Section>
  );
}

function PlanCard({
  plan,
  currency,
  cycle,
}: {
  plan: Plan;
  currency: Currency;
  cycle: Cycle;
}) {
  const prices = plan.prices[currency];
  const isCustom = prices === null;
  const amount = prices ? prices[cycle] : null;
  const suffix = cycle === 'monthly' ? '/mo' : '/yr';

  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex flex-col rounded-xl border p-6 vhx-bg ${
        plan.featured ? 'border-zinc-900 dark:border-zinc-100' : 'vhx-line'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-2.5 left-6 inline-flex items-center rounded-full vhx-bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-950">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-semibold tracking-tight vhx-ink">
        {plan.name}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed vhx-mute">{plan.tagline}</p>

      <div className="mt-6">
        {isCustom ? (
          <div className="text-2xl font-semibold tracking-[-0.03em] vhx-ink">
            Contact sales
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-[-0.03em] vhx-ink">
              {formatPrice(currency, amount as number)}
            </span>
            <span className="text-sm vhx-mute">{suffix}</span>
          </div>
        )}
        <div className="mt-1 text-[11px] vhx-mute">
          {isCustom
            ? 'Custom contract & volume pricing'
            : cycle === 'annually'
              ? 'Billed yearly · save 16%'
              : 'Billed monthly'}
        </div>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] vhx-mute">
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 vhx-text-accent"
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#onboard"
        className={`mt-6 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors ${
          plan.featured
            ? 'vhx-bg-accent text-zinc-950 hover:opacity-90'
            : 'border vhx-line vhx-ink hover:vhx-surface'
        }`}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex gap-1 rounded-lg border vhx-line vhx-bg p-1">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
              active
                ? 'vhx-bg-accent text-zinc-950'
                : 'vhx-mute hover:vhx-ink'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}