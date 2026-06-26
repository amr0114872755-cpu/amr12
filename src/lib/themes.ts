export type ThemeId = 'default' | 'firouz' | 'layali' | 'dhahab';

export type Theme = {
  id: ThemeId;
  nameAr: string;
  description: string;
  preview: string[]; // 4 hex colors for swatch preview
  tokens: {
    bg: string;
    surface: string;
    primary: string;
    accent: string;
    gold: string;
    textOnPrimary: string;
    border: string;
  };
};

export const THEMES: Theme[] = [
  {
    id: 'default',
    nameAr: 'الزمرد (الأساسي)',
    description: 'التصميم الأصلي بألوان الأخضر الزمردي والذهبي.',
    preview: ['#030a06', '#065f46', '#10b981', '#facc15'],
    tokens: { bg: '#030a06', surface: '#062017', primary: '#065f46', accent: '#10b981', gold: '#facc15', textOnPrimary: '#ecfdf5', border: '#0b3a2a' },
  },
  {
    id: 'firouz',
    nameAr: 'الفيروز',
    description: 'تركواز هادئ مستوحى من قباب المساجد العتيقة.',
    preview: ['#04141a', '#0e7490', '#22d3ee', '#fde68a'],
    tokens: { bg: '#04141a', surface: '#072a33', primary: '#0e7490', accent: '#22d3ee', gold: '#fde68a', textOnPrimary: '#ecfeff', border: '#0a4a5a' },
  },
  {
    id: 'layali',
    nameAr: 'ليالي القدر',
    description: 'بنفسجي ليلي عميق بلمسات ذهبية للسهرات الإيمانية.',
    preview: ['#0a0518', '#5b21b6', '#a78bfa', '#f5d782'],
    tokens: { bg: '#0a0518', surface: '#1a0f30', primary: '#5b21b6', accent: '#a78bfa', gold: '#f5d782', textOnPrimary: '#f5f3ff', border: '#3b1d6e' },
  },
  {
    id: 'dhahab',
    nameAr: 'الذهب والمسك',
    description: 'بُني دافئ بحس مصحف عتيق وذهب خفيف.',
    preview: ['#1a0f08', '#78350f', '#d97706', '#fcd34d'],
    tokens: { bg: '#1a0f08', surface: '#2a1810', primary: '#78350f', accent: '#d97706', gold: '#fcd34d', textOnPrimary: '#fffbeb', border: '#6b3410' },
  },
];

export const THEME_STORAGE_KEY = 'app:theme';
export const DEFAULT_THEME: ThemeId = 'default';

const ALL_CLASSES = THEMES.map((t) => `theme-${t.id}`);

export function applyTheme(id: ThemeId) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  for (const c of ALL_CLASSES) html.classList.remove(c);
  html.classList.add(`theme-${id}`);
}

export function readStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    if (v && THEMES.some((t) => t.id === v)) return v;
  } catch { /* ignore */ }
  return DEFAULT_THEME;
}

export function storeTheme(id: ThemeId) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch { /* ignore */ }
}