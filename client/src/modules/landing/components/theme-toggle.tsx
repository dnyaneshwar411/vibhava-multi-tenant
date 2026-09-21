'use client';

import { useTheme } from '@/providers/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border vhx-line text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      {theme === 'dark' ? (
        <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
      ) : (
        <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
      )}
    </button>
  );
}