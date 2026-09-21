'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => { },
});

const STORAGE_KEY = 'vhx-theme';

function applyTheme(t: Theme) {
  const body = document.body;
  if (t === "dark") {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initial);
    setTheme(initial);
    setMounted(true);

    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    setTheme(next);
  };

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);