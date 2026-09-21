'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Button, EyebrowPill } from './primitives';
import { fadeUp, stagger } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 sm:pt-24 sm:pb-28">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-6xl px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <EyebrowPill>
              <span className="h-1.5 w-1.5 rounded-full vhx-bg-accent" />
              Multi-tenant SaaS for modern property ops
            </EyebrowPill>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] vhx-ink sm:text-5xl lg:text-[64px]"
          >
            Run every tenant,
            <br />
            property, and payout
            <br />
            from <span className="vhx-text-accent">one workspace.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed vhx-mute sm:text-lg"
          >
            Vibhava is the multi-tenant platform for estate managers — isolated
            workspaces, subdomain routing, granular RBAC, and custom branding
            out of the box.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#onboard" size="lg" arrow>
              Start onboarding
            </Button>
            <Button href="#pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs vhx-mute"
          >
            {['SOC 2 ready', 'Subdomain routing', 'Row-level isolation'].map(
              (t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 vhx-text-accent" strokeWidth={3} />
                  {t}
                </span>
              ),
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16"
        >
          <WorkspacePreview />
        </motion.div>
      </motion.div>
    </section>
  );
}

function WorkspacePreview() {
  const tenants = [
    { name: 'Ashford Group', plan: 'Enterprise', units: 240, mrr: '$9,600' },
    { name: 'Marlowe Holdings', plan: 'Professional', units: 84, mrr: '$3,360' },
    { name: 'Greystone Realty', plan: 'Starter', units: 24, mrr: '$960' },
  ];

  return (
    <div className="overflow-hidden rounded-xl border vhx-line vhx-bg shadow-sm">
      <div className="flex items-center justify-between border-b vhx-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <span className="ml-2 text-[11px] vhx-mute">
            app.vibhava.io/workspaces
          </span>
        </div>
        <span className="text-[11px] vhx-mute">3 tenants</span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <Kpi label="Total tenants" value="128" delta="+12" />
        <Kpi label="Combined units" value="8,420" delta="+340" />
        <Kpi label="Platform MRR" value="$184K" delta="+18.4%" accent />
      </div>

      <div className="mx-4 mb-4 overflow-hidden rounded-lg border vhx-line sm:mx-5 sm:mb-5">
        <div className="grid grid-cols-4 border-b vhx-line vhx-surface px-3 py-2 text-[11px] vhx-mute">
          <span>Tenant</span>
          <span>Plan</span>
          <span>Units</span>
          <span className="text-right">MRR</span>
        </div>
        {tenants.map((t) => (
          <div
            key={t.name}
            className="grid grid-cols-4 border-b vhx-line px-3 py-3 text-[13px] last:border-0"
          >
            <span className="font-medium vhx-ink">{t.name}</span>
            <span className="vhx-mute">{t.plan}</span>
            <span className="vhx-mute">{t.units}</span>
            <span className="text-right font-medium vhx-text-accent">
              {t.mrr}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border vhx-line vhx-surface p-4">
      <div className="text-[10px] uppercase tracking-wider vhx-mute">
        {label}
      </div>
      <div
        className={`mt-1 text-2xl font-semibold tracking-[-0.03em] ${
          accent ? 'vhx-text-accent' : 'vhx-ink'
        }`}
      >
        {value}
      </div>
      <div className="text-[11px] vhx-text-accent">{delta}</div>
    </div>
  );
}