'use client';

import { motion } from 'motion/react';
import {
  ArrowRight,
  LockKeyhole,
  Ruler,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Footer from '@/modules/landing/components/footer';
import Navbar from '@/modules/landing/components/navbar';
import {
  Button,
  Section,
  SectionHeading,
  SurfaceCard,
} from '@/modules/landing/components/primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { ThemeProvider } from '@/providers/theme-provider';

const values = [
  {
    icon: Ruler,
    number: '01',
    title: 'Precision',
    description:
      'Every ledger, work order, and yield is measured with the same discipline as the asset itself.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Stewardship',
    description:
      'We protect the long horizon: durable relationships, considered decisions, and compounding value.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Security',
    description:
      'Private by design. Every organization, unit, and financial record remains isolated and accountable.',
  },
];

const stats = [
  { value: '86+', label: 'Units governed' },
  { value: '100%', label: 'Organization isolation' },
  { value: '24/7', label: 'Operational visibility' },
];

const principles = [
  {
    title: 'Own the details',
    body: 'Ledgers, work orders, and owner statements are only as good as the discipline behind them.',
  },
  {
    title: 'Design for decades',
    body: 'Every decision is made with the next ten years of the asset in mind, not the next quarter.',
  },
  {
    title: 'Isolate by default',
    body: 'Privacy and tenant boundaries are architectural, not add-ons.',
  },
];

export default function AboutPage() {
  return (
      <main className="relative min-h-screen vhx-bg vhx-ink antialiased">
        <Navbar />

        <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-28">
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
            className="relative mx-auto max-w-3xl px-6 text-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border vhx-line vhx-surface px-3 py-1 text-xs vhx-mute"
            >
              <span className="h-1.5 w-1.5 rounded-full vhx-bg-accent" />
              Our philosophy
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl font-semibold leading-[1.03] tracking-[-0.045em] vhx-ink sm:text-5xl lg:text-6xl"
            >
              The science of
              <br />
              <span className="vhx-text-accent">enduring stewardship.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed vhx-mute sm:text-lg"
            >
              Vibhava pairs the quiet discipline of heritage stewardship with
              software precision — giving every property, tenant, and owner the
              attention it deserves.
            </motion.p>
          </motion.div>
        </section>

        {/* ---------- Core values ---------- */}
        <Section id="values">
          <SectionHeading
            eyebrow="Core values"
            title="Built for the long view."
            description="Three principles shape how every workspace, ledger, and ticket is designed."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-4 md:grid-cols-3"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp}>
                <SurfaceCard className="h-full p-7">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md vhx-bg-accent">
                      <v.icon
                        className="h-4 w-4 text-zinc-950"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="text-[11px] font-medium tabular-nums vhx-mute">
                      {v.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight vhx-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed vhx-mute">
                    {v.description}
                  </p>
                </SurfaceCard>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ---------- Origin & intent ---------- */}
        <Section>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeading
                eyebrow="Origin & intent"
                title="Technology in service of trust."
              />
              <motion.div
                variants={fadeUp}
                className="mt-7 space-y-5 text-sm leading-relaxed vhx-mute sm:text-base"
              >
                <p>
                  Vibhava began with a simple observation: the best property
                  operators were still managing enduring assets through
                  disconnected spreadsheets, inboxes, and delayed reports.
                </p>
                <p>
                  We built a private operating layer for estates that deserve
                  more than a generic dashboard. One system brings financial
                  truth, maintenance momentum, and owner confidence into the same
                  considered view.
                </p>
                <p>
                  The result is not more noise. It is the calm that comes from
                  knowing every important detail is current, protected, and
                  ready for the next decision.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <Button href="/contact" variant="primary" size="lg" arrow>
                  Speak with our team
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats panel */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SurfaceCard className="p-7 sm:p-9">
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider vhx-mute">
                  <LockKeyhole className="h-3.5 w-3.5 vhx-text-accent" />
                  Stewardship by the numbers
                </div>

                <div className="mt-8 divide-y vhx-divide">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-end justify-between py-6 first:pt-0 last:pb-0"
                    >
                      <span className="text-sm vhx-mute">{s.label}</span>
                      <span className="text-4xl font-semibold tracking-[-0.03em] vhx-ink">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t vhx-line pt-6">
                  <p className="text-xs leading-relaxed vhx-mute">
                    Every measure reflects our operating standard: clear records,
                    deliberate action, and no compromise on privacy.
                  </p>
                </div>
              </SurfaceCard>
            </motion.div>
          </div>
        </Section>

        {/* ---------- Operating principles ---------- */}
        <Section>
          <SectionHeading
            eyebrow="Operating principles"
            title="How we work, day to day."
            description="The habits behind the standard."
            align="center"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3"
          >
            {principles.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp}>
                <SurfaceCard className="h-full p-6">
                  <span className="text-[11px] font-medium tabular-nums vhx-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-base font-semibold tracking-tight vhx-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed vhx-mute">
                    {p.body}
                  </p>
                </SurfaceCard>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <section className="border-t vhx-line py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="relative overflow-hidden rounded-2xl border vhx-line vhx-surface p-10 text-center sm:p-16"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[400px] -translate-x-1/2 rounded-full vhx-bg-accent opacity-20 blur-3xl"
              />
              <motion.h2
                variants={fadeUp}
                className="relative text-3xl font-semibold tracking-[-0.035em] vhx-ink sm:text-4xl"
              >
                If stewardship is your standard,
                <br />
                <span className="vhx-text-accent">we should talk.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="relative mx-auto mt-5 max-w-lg text-base leading-relaxed vhx-mute"
              >
                We work with a small number of operators each quarter. Bring us
                your portfolio and we&apos;ll show you what considered software
                looks like.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button href="/contact" size="lg" arrow>
                  Contact us
                </Button>
                <Button href="/#pricing" variant="secondary" size="lg">
                  See pricing
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
  );
}