'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export default function Announcement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative z-[60] w-full border-b vhx-line vhx-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5">
        <p className="flex items-center gap-2 text-[12px] vhx-mute">
          <span className="hidden h-1.5 w-1.5 rounded-full vhx-bg-accent sm:inline-block" />
          <span className="hidden sm:inline">
            New — Subdomain routing and per-tenant SSO are now GA.
          </span>
          <span className="sm:hidden">Subdomain routing is now GA.</span>
          <a
            href="#features"
            className="ml-1 inline-flex items-center gap-1 font-medium vhx-ink hover:vhx-text-accent"
          >
            Read more
            <ArrowRight className="h-3 w-3" />
          </a>
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="text-zinc-400 transition-colors hover:vhx-ink"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}