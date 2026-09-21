'use client';

import { motion } from 'motion/react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

/* ---------------- Buttons ---------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  arrow,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  arrow?: boolean;
}) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all';
  const sizes: Record<ButtonSize, string> = {
    md: 'h-10 px-4 text-[13px]',
    lg: 'h-11 px-5 text-sm',
  };
  const variants: Record<ButtonVariant, string> = {
    primary:
      'vhx-bg-accent text-zinc-950 font-semibold hover:opacity-90 active:opacity-80',
    secondary:
      'border vhx-line vhx-bg vhx-ink hover:vhx-surface',
    ghost:
      'vhx-mute hover:vhx-ink',
  };
  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      )}
    </a>
  );
}


export function Section({
  id,
  children,
  className = '',
  bordered = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${bordered ? 'border-t vhx-line' : ''} py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-medium uppercase tracking-wider vhx-mute"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-3xl font-semibold tracking-[-0.035em] vhx-ink sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed vhx-mute"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export function SurfaceCard({
  children,
  className = '',
  hover = true,
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  elevated?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border vhx-line ${
        elevated ? 'vhx-surface' : 'vhx-bg'
      } ${
        hover ? 'transition-colors hover:vhx-surface' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function EyebrowPill({
  children,
  accent = false,
  className = '',
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border vhx-line px-3 py-1 text-xs ${
        accent ? 'vhx-bg-accent text-zinc-950 border-transparent font-semibold' : 'vhx-surface vhx-mute'
      } ${className}`}
    >
      {children}
    </span>
  );
}