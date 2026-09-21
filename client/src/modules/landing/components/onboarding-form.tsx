'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { Section, SectionHeading } from './primitives';
import { fadeUp, stagger, viewport } from '@/lib/animations';

type FormState = {
  org: string;
  name: string;
  email: string;
  phone: string;
  scale: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const scaleOptions = [
  '1–10 units',
  '11–50 units',
  '51–250 units',
  '251–1,000 units',
  '1,000+ units',
];

export default function OnboardingForm() {
  const [form, setForm] = useState<FormState>({
    org: '',
    name: '',
    email: '',
    phone: '',
    scale: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.org.trim()) e.org = 'Organization name is required';
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Mobile number is required';
    else if (form.phone.replace(/\D/g, '').length < 7)
      e.phone = 'Enter a valid mobile number';
    if (!form.scale) e.scale = 'Select your team size';
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <Section id="onboard">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
      >
        <div>
          <SectionHeading
            eyebrow="Get started"
            title="Onboard your organization."
            description="Tell us a bit about your portfolio. We’ll spin up a sandbox workspace on your subdomain within one business day."
          />
          <ul className="mt-8 space-y-3">
            {[
              'Dedicated sandbox tenant on your subdomain',
              'Guided migration from your current stack',
              'SOC 2 report and DPA available on request',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm vhx-mute">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 vhx-text-accent"
                  strokeWidth={2.5}
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={fadeUp}
          className="rounded-xl border vhx-line vhx-bg p-6 sm:p-7"
        >
          {submitted ? (
            <SuccessPanel org={form.org} />
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <Field
                label="Organization name"
                value={form.org}
                onChange={(v) => update('org', v)}
                error={errors.org}
                placeholder="Ashford Property Group"
              />
              <Field
                label="Full name"
                value={form.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                placeholder="Jane Doe"
              />
              <Field
                label="Email address"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                error={errors.email}
                placeholder="jane@ashford.com"
              />
              <Field
                label="Mobile number"
                type="tel"
                value={form.phone}
                onChange={(v) => update('phone', v)}
                error={errors.phone}
                placeholder="+91 98765 43210"
              />

              <div>
                <label className="block text-[12px] font-medium vhx-ink">
                  Team size / tenant scale
                </label>
                <select
                  value={form.scale}
                  onChange={(e) => update('scale', e.target.value)}
                  className={`mt-1.5 h-10 w-full rounded-md border bg-transparent px-3 text-sm vhx-ink outline-none transition-colors focus:border-zinc-900 dark:focus:border-zinc-100 ${
                    errors.scale ? 'border-red-500' : 'vhx-line'
                  }`}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {scaleOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.scale && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.scale}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-md vhx-bg-accent text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
              >
                Submit request
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-center text-[11px] vhx-mute">
                By submitting you agree to our terms. We’ll never share your
                data.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium vhx-ink">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 h-10 w-full rounded-md border bg-transparent px-3 text-sm vhx-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 ${
          error ? 'border-red-500' : 'vhx-line'
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function SuccessPanel({ org }: { org: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-8 text-center"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full vhx-bg-accent">
        <Check className="h-5 w-5 text-zinc-950" strokeWidth={3} />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight vhx-ink">
        Request received
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed vhx-mute">
        Thanks — we’ve queued a sandbox for{' '}
        <span className="font-medium vhx-ink">
          {org || 'your organization'}
        </span>
        . Expect a follow-up within one business day.
      </p>
    </motion.div>
  );
}