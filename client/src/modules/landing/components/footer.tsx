'use client';

const footerLinks = {
  Platform: ['Overview', 'Financials', 'Maintenance', 'Analytics'],
  Company: ['About', 'Stewardship', 'Careers', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Security', 'Status'],
  Legal: ['Privacy', 'Terms', 'SOC 2', 'SLA'],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-deep">
      <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="#" className="flex items-center">
              <span className="font-serif text-xl font-semibold tracking-[0.25em] text-white">
                VIBHAVA
              </span>
            </a>
            <p className="mt-5 text-sm text-white/35 leading-relaxed tracking-tight font-light max-w-xs">
              Precision property stewardship for enduring assets. A unified
              engine for tenants, maintenance, and owner yields.
            </p>
            {/* Status badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-gold/20 rounded-sm bg-gold/[0.03]">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-soft" />
              <span className="text-[11px] text-gold/70 tracking-wide font-medium">
                Systems Operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[10px] text-white/35 font-medium tracking-wide uppercase mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/45 hover:text-white tracking-tight transition-colors duration-200 font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 tracking-tight font-light">
            &copy; 2026 Vibhava Estate Systems. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/25 tracking-tight font-light">
            <a href="#" className="hover:text-white/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white/50 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white/50 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
