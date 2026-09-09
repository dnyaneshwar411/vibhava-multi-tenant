'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '/#showcase' },
  { label: 'About', href: '/about' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`mt-4 flex items-center justify-between rounded-sm px-5 py-3 transition-all duration-500 ${
            scrolled
              ? 'backdrop-blur-md bg-black/40 border border-white/10'
              : 'border border-transparent'
          }`}
        >
          {/* Wordmark */}
          <a href="/" className="flex items-center">
            <span className="font-serif text-xl font-semibold tracking-[0.25em] text-white">
              VIBHAVA
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wide text-white/50 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="/#cta"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-gold/30 bg-gold/5 text-gold text-xs font-semibold tracking-wide uppercase rounded-sm transition-all duration-400 hover:bg-gold hover:text-ink hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]"
            >
              Access Platform
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden overflow-hidden mt-2 rounded-sm border border-white/10 bg-black/60 backdrop-blur-md"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-medium tracking-wide text-white/50 hover:text-white transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#cta"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gold/30 bg-gold/5 text-gold text-xs font-semibold tracking-wide uppercase rounded-sm"
              >
                Access Platform
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}