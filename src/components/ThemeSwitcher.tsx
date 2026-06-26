import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { readStoredTheme, DEFAULT_THEME, type ThemeId } from '@/lib/themes';
import { readStoredDisplay, DEFAULT_DISPLAY, type DisplayId } from '@/lib/displayModes';

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [current, setCurrent] = useState<ThemeId>(DEFAULT_THEME);
  const [display, setDisplay] = useState<DisplayId>(DEFAULT_DISPLAY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrent(readStoredTheme());
    setDisplay(readStoredDisplay());
    setMounted(true);
  }, []);

  const customized = current !== DEFAULT_THEME || display !== DEFAULT_DISPLAY;

  return (
    <Link
      to="/more/themes"
      aria-label="تغيير شكل التطبيق"
      title="تغيير شكل التطبيق"
      className={`relative inline-flex items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/60 transition-all ${
        compact ? 'w-9 h-9' : 'w-10 h-10'
      }`}
    >
      <Palette className="w-4 h-4" />
      {mounted && customized && (
        <span className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 rounded-full bg-gold-400 ring-2 ring-[#030a06]" />
      )}
    </Link>
  );
}
