'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './primitives';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const links = [
  { label: 'Platform', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled
          ? 'border-b vhx-line backdrop-blur-xl bg-white/85 dark:bg-zinc-950/75'
          : 'border-b border-transparent'
        }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <Avatar className="h-7 w-7 vhx-bg-accent">
            <AvatarImage src="/favicon.png" />
            <AvatarFallback className="vhx-bg-accent text-black">V</AvatarFallback>
          </Avatar>
          <span className="text-[15px] font-semibold tracking-tight vhx-ink">
            Vibhava
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] vhx-mute transition-colors hover:vhx-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#onboard"
            className="inline-flex h-8 items-center rounded-md border vhx-line px-3.5 text-[13px] font-medium vhx-ink transition-colors hover:vhx-surface"
          >
            Sign in
          </a>
          <Button href="#onboard" size="md">
            Get started
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border vhx-line vhx-mute"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t vhx-line vhx-bg md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm vhx-mute hover:vhx-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#onboard"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex h-9 items-center justify-center rounded-md vhx-bg-accent px-4 text-sm font-semibold text-zinc-950"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}