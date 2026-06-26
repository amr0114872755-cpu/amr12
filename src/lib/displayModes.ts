export type DisplayId = 'classic' | 'glass' | 'soft' | 'minimal' | 'elevated';

export type DisplayMode = {
  id: DisplayId;
  nameAr: string;
  description: string;
  /** Preview-only style hints applied inline to the live preview card. */
  preview: {
    radius: number; // px corner radius for cards
    shadow: string; // CSS box-shadow for cards
    blur: number; // backdrop blur px (0 = none)
    surfaceAlpha: number; // 0..1 surface opacity multiplier feel
    borderAlpha: number; // 0..1 border emphasis
  };
};

export const DISPLAY_MODES: DisplayMode[] = [
  {
    id: 'classic',
    nameAr: 'الأساسي (كلاسيكي)',
    description: 'الشكل الأصلي للتطبيق بحوافه وظلاله المعتادة.',
    preview: { radius: 16, shadow: '0 10px 30px -10px rgba(0,0,0,0.5)', blur: 0, surfaceAlpha: 1, borderAlpha: 1 },
  },
  {
    id: 'glass',
    nameAr: 'زجاجي',
    description: 'كروت شفافة بتأثير زجاج ضبابي وحدود فاتحة — مظهر عصري أنيق.',
    preview: { radius: 22, shadow: '0 8px 32px -8px rgba(0,0,0,0.45)', blur: 14, surfaceAlpha: 0.5, borderAlpha: 1.6 },
  },
  {
    id: 'soft',
    nameAr: 'ناعم ودائري',
    description: 'حواف دائرية أكبر وظلال ناعمة واسعة وإحساس هادئ مريح.',
    preview: { radius: 28, shadow: '0 18px 45px -12px rgba(0,0,0,0.55)', blur: 0, surfaceAlpha: 1, borderAlpha: 0.7 },
  },
  {
    id: 'minimal',
    nameAr: 'مسطّح حاد',
    description: 'حواف صغيرة شبه مستقيمة بدون ظلال وحدود رفيعة — مظهر نظيف جاد.',
    preview: { radius: 6, shadow: 'none', blur: 0, surfaceAlpha: 1, borderAlpha: 1.2 },
  },
  {
    id: 'elevated',
    nameAr: 'بارز',
    description: 'كروت مرفوعة بعمق وظل مزدوج وأزرار بارزة — إحساس ملموس.',
    preview: { radius: 18, shadow: '0 2px 0 rgba(255,255,255,0.04), 0 16px 40px -10px rgba(0,0,0,0.7)', blur: 0, surfaceAlpha: 1, borderAlpha: 0.9 },
  },
];

export const DISPLAY_STORAGE_KEY = 'app:display';
export const DEFAULT_DISPLAY: DisplayId = 'classic';

const ALL_CLASSES = DISPLAY_MODES.map((m) => `display-${m.id}`);

export function applyDisplay(id: DisplayId) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  for (const c of ALL_CLASSES) html.classList.remove(c);
  // classic is the default look — no class needed.
  if (id !== 'classic') html.classList.add(`display-${id}`);
}

export function readStoredDisplay(): DisplayId {
  if (typeof window === 'undefined') return DEFAULT_DISPLAY;
  try {
    const v = window.localStorage.getItem(DISPLAY_STORAGE_KEY) as DisplayId | null;
    if (v && DISPLAY_MODES.some((m) => m.id === v)) return v;
  } catch { /* ignore */ }
  return DEFAULT_DISPLAY;
}

export function storeDisplay(id: DisplayId) {
  try {
    window.localStorage.setItem(DISPLAY_STORAGE_KEY, id);
  } catch { /* ignore */ }
}
