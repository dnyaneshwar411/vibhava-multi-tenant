'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
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

const channels = [
  {
    icon: Mail,
    label: 'General enquiries',
    value: 'hello@vibhava.estate',
    href: 'mailto:hello@vibhava.estate',
  },
  {
    icon: MessageSquare,
    label: 'Platform architecture',
    value: 'architecture@vibhava.estate',
    href: 'mailto:architecture@vibhava.estate',
  },
  {
    icon: Phone,
    label: 'Client relations',
    value: '+1 (212) 555-0148',
    href: 'tel:+12125550148',
  },
  {
    icon: MapPin,
    label: 'Principal office',
    value: 'New York · London · Singapore',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen vhx-bg vhx-ink antialiased">
      <Navbar />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
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
            Client relations
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl font-semibold leading-[1.03] tracking-[-0.045em] vhx-ink sm:text-5xl lg:text-6xl"
          >
            Direct channel.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed vhx-mute sm:text-lg"
          >
            Connect with our client relations or platform architecture teams.
          </motion.p>
        </motion.div>
      </section>

      {/* ---------- Channels + Form ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Channels */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-2"
          >
            <SectionHeading
              eyebrow="Channels"
              title="A considered reply starts here."
              description="Tell us what you are building, operating, or protecting. We route every inquiry to the right specialist."
            />

            <motion.div variants={fadeUp} className="mt-10 space-y-6">
              {channels.map((c) => (
                <ContactChannel key={c.label} {...c} />
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              id="status"
              className="mt-10 inline-flex items-center gap-2 rounded-md border vhx-line vhx-surface px-3 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full vhx-bg-accent" />
              <span className="text-[11px] font-medium uppercase tracking-wider vhx-mute">
                Support queue active
              </span>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-3"
          >
            <SurfaceCard hover={false} className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between border-b vhx-line pb-5">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider vhx-mute">
                    Secure enquiry
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] vhx-ink">
                    Start a conversation.
                  </h2>
                </div>
                <span className="text-[11px] font-medium tabular-nums vhx-mute">
                  01 / 01
                </span>
              </div>

              {submitted ? (
                <SuccessPanel onReset={() => setSubmitted(false)} />
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      placeholder="you@estate.com"
                      required
                    />
                  </div>

                  <Field
                    label="Portfolio size"
                    name="portfolio"
                    placeholder="e.g. 120 units across 6 properties"
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[11px] font-medium uppercase tracking-wider vhx-mute"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us what you are looking to improve."
                      className="w-full resize-none rounded-md border vhx-line bg-transparent px-4 py-3 text-sm vhx-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-md vhx-bg-accent text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
                  >
                    Send enquiry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <p className="text-center text-[11px] vhx-mute">
                    Your information is handled under our privacy standards.
                  </p>
                </form>
              )}
            </SurfaceCard>
          </motion.div>
        </div>
      </Section>

      {/* ---------- Alternate CTA ---------- */}
      <section className="border-t vhx-line py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative overflow-hidden rounded-2xl border vhx-line vhx-surface p-10 sm:p-14"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 h-48 w-[400px] rounded-full vhx-bg-accent opacity-20 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <motion.h2
                  variants={fadeUp}
                  className="text-2xl font-semibold tracking-[-0.035em] vhx-ink sm:text-3xl"
                >
                  Prefer to skip the form?
                  <br />
                  <span className="vhx-text-accent">
                    Book a working session.
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="mt-4 max-w-lg text-sm leading-relaxed vhx-mute sm:text-base"
                >
                  Forty-five minutes with a solutions engineer, focused on your
                  portfolio. No slides, no pitch — just your numbers and our
                  platform.
                </motion.p>
              </div>
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row lg:justify-end"
              >
                <Button href="/#onboard" size="lg" arrow>
                  Book a session
                </Button>
                <Button href="/#pricing" variant="secondary" size="lg">
                  See pricing
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------------- Sub-components ---------------- */

function ContactChannel({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border vhx-line vhx-surface">
        <Icon className="h-3.5 w-3.5 vhx-text-accent" strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-wider vhx-mute">
          {label}
        </div>
        <div className="mt-1 text-sm vhx-ink">{value}</div>
      </div>
    </>
  );

  return href ? (
    <a
      href={href}
      className="group flex items-start gap-3 transition-colors"
    >
      {inner}
    </a>
  ) : (
    <div className="flex items-start gap-3">{inner}</div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-medium uppercase tracking-wider vhx-mute"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border vhx-line bg-transparent px-4 text-sm vhx-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
      />
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[390px] flex-col items-center justify-center py-8 text-center"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full vhx-bg-accent">
        <Check className="h-5 w-5 text-zinc-950" strokeWidth={3} />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight vhx-ink">
        Message received
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed vhx-mute">
        A member of our team will respond within one business day.
      </p>
      <button
        onClick={onReset}
        className="mt-7 text-xs font-semibold uppercase tracking-wider vhx-text-accent transition-opacity hover:opacity-70"
      >
        Send another message
      </button>
    </motion.div>
  );
}