export type AppTemplateId = 'classic' | 'fajr';

export type AppTemplate = {
  id: AppTemplateId;
  nameAr: string;
  description: string;
};

export const APP_TEMPLATES: AppTemplate[] = [
  {
    id: 'classic',
    nameAr: 'القالب الأصلي',
    description: 'الواجهة الأصلية الزمردية مع البطل والأقسام التعريفية وقائمة السور.',
  },
  {
    id: 'fajr',
    nameAr: 'قالب الفجر',
    description: 'واجهة عصرية بهيدر شروق صحراوي وعدّاد تنازلي للصلاة القادمة، أوقات صلاة أفقية، شبكة ميزات، وتاب بار سفلي ثابت.',
  },
];

export const APP_TEMPLATE_STORAGE_KEY = 'app:template';
export const DEFAULT_APP_TEMPLATE: AppTemplateId = 'classic';
const ALL_IDS: AppTemplateId[] = ['classic', 'fajr'];
const ALL_CLASSES = ALL_IDS.map((id) => `app-template-${id}`);

export const APP_TEMPLATE_CHANGED_EVENT = 'app:template-changed';

export function applyAppTemplate(id: AppTemplateId) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  for (const c of ALL_CLASSES) html.classList.remove(c);
  if (id !== 'classic') html.classList.add(`app-template-${id}`);
  try {
    window.dispatchEvent(new CustomEvent(APP_TEMPLATE_CHANGED_EVENT, { detail: id }));
  } catch { /* ignore */ }
}

export function readStoredAppTemplate(): AppTemplateId {
  if (typeof window === 'undefined') return DEFAULT_APP_TEMPLATE;
  try {
    const v = window.localStorage.getItem(APP_TEMPLATE_STORAGE_KEY) as AppTemplateId | 'prayer-now' | null;
    // Legacy template id renamed from "prayer-now" to "fajr".
    if (v === 'prayer-now') return 'fajr';
    if (v && ALL_IDS.includes(v)) return v;
  } catch { /* ignore */ }
  return DEFAULT_APP_TEMPLATE;
}

export function storeAppTemplate(id: AppTemplateId) {
  try {
    window.localStorage.setItem(APP_TEMPLATE_STORAGE_KEY, id);
  } catch { /* ignore */ }
}
