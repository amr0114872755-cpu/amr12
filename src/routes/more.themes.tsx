import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Palette, RotateCcw, Play, BookOpen, Layers, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import {
  THEMES,
  DEFAULT_THEME,
  type ThemeId,
  applyTheme,
  readStoredTheme,
  storeTheme,
} from "@/lib/themes";
import {
  DISPLAY_MODES,
  DEFAULT_DISPLAY,
  type DisplayId,
  applyDisplay,
  readStoredDisplay,
  storeDisplay,
} from "@/lib/displayModes";
import {
  APP_TEMPLATES,
  DEFAULT_APP_TEMPLATE,
  type AppTemplateId,
  applyAppTemplate,
  readStoredAppTemplate,
  storeAppTemplate,
} from "@/lib/appTemplates";
import fajrPreview from "@/assets/fajr-header.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/more/themes")({
  head: () => ({
    meta: [
      { title: "شكل التطبيق — اللون، نمط العرض، وقالب التطبيق" },
      { name: "description", content: "اختر لون التطبيق، نمط العرض (زجاجي، ناعم، مسطّح، بارز)، وقالب التطبيق الكامل مع معاينة حية." },
      { property: "og:title", content: "شكل التطبيق" },
      { property: "og:description", content: "اختر اللون، نمط العرض، وقالب التطبيق الكامل." },
    ],
  }),
  component: ThemesPage,
});

type Tab = "color" | "display" | "template";

function ThemesPage() {
  const [tab, setTab] = useState<Tab>("color");
  const [appliedTemplate, setAppliedTemplate] = useState<AppTemplateId>(DEFAULT_APP_TEMPLATE);

  // Color theme state
  const [appliedTheme, setAppliedTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(DEFAULT_THEME);

  // Display mode state
  const [appliedDisplay, setAppliedDisplay] = useState<DisplayId>(DEFAULT_DISPLAY);
  const [selectedDisplay, setSelectedDisplay] = useState<DisplayId>(DEFAULT_DISPLAY);

  useEffect(() => {
    const t = readStoredTheme();
    setAppliedTheme(t);
    setSelectedTheme(t);
    const d = readStoredDisplay();
    setAppliedDisplay(d);
    setSelectedDisplay(d);
    setAppliedTemplate(readStoredAppTemplate());
  }, []);

  const applyTemplateChoice = (id: AppTemplateId) => {
    storeAppTemplate(id);
    applyAppTemplate(id);
    setAppliedTemplate(id);
    const t = APP_TEMPLATES.find((x) => x.id === id);
    toast.success(`تم تطبيق «${t?.nameAr ?? ""}» — افتح الرئيسية لرؤيته`);
  };

  const theme = useMemo(
    () => THEMES.find((t) => t.id === selectedTheme) ?? THEMES[0],
    [selectedTheme]
  );
  const display = useMemo(
    () => DISPLAY_MODES.find((m) => m.id === selectedDisplay) ?? DISPLAY_MODES[0],
    [selectedDisplay]
  );

  const applyColor = (id: ThemeId) => {
    storeTheme(id);
    applyTheme(id);
    setAppliedTheme(id);
    const t = THEMES.find((x) => x.id === id);
    toast.success(`تم تطبيق لون «${t?.nameAr ?? ""}» على التطبيق كاملاً`);
    triggerRipple();
  };

  const applyMode = (id: DisplayId) => {
    storeDisplay(id);
    applyDisplay(id);
    setAppliedDisplay(id);
    const m = DISPLAY_MODES.find((x) => x.id === id);
    toast.success(`تم تطبيق نمط «${m?.nameAr ?? ""}» على التطبيق كاملاً`);
    triggerRipple();
  };

  const resetColor = () => {
    storeTheme(DEFAULT_THEME);
    applyTheme(DEFAULT_THEME);
    setAppliedTheme(DEFAULT_THEME);
    setSelectedTheme(DEFAULT_THEME);
    toast.success("تم استعادة اللون الأساسي");
  };

  const resetMode = () => {
    storeDisplay(DEFAULT_DISPLAY);
    applyDisplay(DEFAULT_DISPLAY);
    setAppliedDisplay(DEFAULT_DISPLAY);
    setSelectedDisplay(DEFAULT_DISPLAY);
    toast.success("تم استعادة نمط العرض الأساسي");
  };

  // Preview card styling reflects BOTH the selected color theme and display mode.
  const cardStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    borderRadius: display.preview.radius,
    boxShadow: display.preview.shadow === "none" ? undefined : display.preview.shadow,
    backdropFilter: display.preview.blur ? `blur(${display.preview.blur}px) saturate(135%)` : undefined,
    ...extra,
  });

  const glassSurface = (base: string) =>
    selectedDisplay === "glass" ? "rgba(255,255,255,0.06)" : base;
  const glassBorder = (base: string) =>
    selectedDisplay === "glass" ? "rgba(255,255,255,0.16)" : base;
  const borderWidth = selectedDisplay === "minimal" ? 1 : 1;

  // Ripple feedback that sweeps across the whole page on apply.
  const [ripple, setRipple] = useState(0);
  const triggerRipple = () => setRipple((n) => n + 1);

  // Apply-button shape mirrors the selected display mode so the user
  // sees the new "feel" on the very button they're about to press.
  const applyButtonStyle = (isApplied: boolean): React.CSSProperties => {
    const radius =
      selectedDisplay === "minimal"
        ? 0
        : selectedDisplay === "soft"
          ? 28
          : selectedDisplay === "glass"
            ? 22
            : selectedDisplay === "elevated"
              ? 14
              : 16;
    const shadow =
      selectedDisplay === "minimal"
        ? "none"
        : selectedDisplay === "elevated"
          ? `0 1px 0 rgba(255,255,255,0.18) inset, 0 18px 40px -10px ${theme.tokens.accent}66`
          : selectedDisplay === "glass"
            ? `0 8px 32px -10px ${theme.tokens.accent}55, inset 0 1px 0 rgba(255,255,255,0.18)`
            : selectedDisplay === "soft"
              ? `0 22px 50px -16px ${theme.tokens.accent}80`
              : `0 10px 26px -10px ${theme.tokens.accent}80`;
    const background = isApplied
      ? theme.tokens.surface
      : selectedDisplay === "glass"
        ? `linear-gradient(135deg, ${theme.tokens.accent}cc 0%, ${theme.tokens.gold}aa 100%)`
        : `linear-gradient(135deg, ${theme.tokens.accent} 0%, ${theme.tokens.gold} 100%)`;
    return {
      borderRadius: radius,
      background,
      color: isApplied ? theme.tokens.gold : theme.tokens.bg,
      border: `1px solid ${selectedDisplay === "glass" ? "rgba(255,255,255,0.22)" : theme.tokens.border}`,
      boxShadow: isApplied ? "none" : shadow,
      backdropFilter: selectedDisplay === "glass" ? "blur(14px) saturate(140%)" : undefined,
    };
  };

  return (
    <main className="min-h-screen bg-[#030a06] relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Page-wide ripple feedback when a theme/display is applied */}
      <AnimatePresence>
        {ripple > 0 && (
          <motion.div
            key={ripple}
            initial={{ opacity: 0.55, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
            aria-hidden
          >
            <div
              className="w-[60vmax] h-[60vmax] rounded-full"
              style={{
                background: `radial-gradient(circle, ${theme.tokens.accent}55 0%, ${theme.tokens.gold}22 40%, transparent 70%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-cairo text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Link>
          <div className="flex items-center gap-2 text-white">
            <Palette className="w-5 h-5 text-emerald-400" />
            <h1 className="font-cairo font-bold text-xl">شكل التطبيق</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-2xl border border-emerald-900/40 bg-emerald-950/30 mb-6 max-w-lg mx-auto">
          <button
            onClick={() => setTab("color")}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 font-cairo text-xs sm:text-sm font-bold transition-all ${
              tab === "color"
                ? "bg-emerald-500 text-[#030a06]"
                : "text-emerald-300 hover:bg-emerald-900/40"
            }`}
          >
            <Palette className="w-4 h-4" />
            اللون
          </button>
          <button
            onClick={() => setTab("display")}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 font-cairo text-xs sm:text-sm font-bold transition-all ${
              tab === "display"
                ? "bg-emerald-500 text-[#030a06]"
                : "text-emerald-300 hover:bg-emerald-900/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            نمط العرض
          </button>
          <button
            onClick={() => setTab("template")}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 font-cairo text-xs sm:text-sm font-bold transition-all ${
              tab === "template"
                ? "bg-emerald-500 text-[#030a06]"
                : "text-emerald-300 hover:bg-emerald-900/40"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            قالب التطبيق
          </button>
        </div>

        <p className="text-gray-400 font-cairo text-sm mb-6 text-center">
          {tab === "color"
            ? "اختر لون التطبيق، عاينه، ثم اضغط \"تطبيق هذا اللون\" لحفظه."
            : tab === "display"
              ? "اختر نمط العرض (الإحساس والشكل)، عاينه، ثم اضغط \"تطبيق هذا النمط\". يعمل مع أي لون."
              : "اختر شكل واجهة التطبيق بالكامل. الأصلي افتراضي، أو جرّب قالب «الفجر» العصري."}
        </p>

        {tab === "template" ? (
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {APP_TEMPLATES.map((t) => {
              const isApplied = appliedTemplate === t.id;
              const isFajr = t.id === "fajr";
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border overflow-hidden bg-emerald-950/30 ${
                    isApplied ? "border-emerald-500/70 shadow-lg shadow-emerald-900/40" : "border-emerald-900/40"
                  }`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#0a1f17]">
                    {isFajr ? (
                      <>
                        <img src={fajrPreview} alt="معاينة قالب الفجر" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                          <div className="text-white text-center font-cairo" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.55)' }}>
                            <div className="text-xs opacity-90">الشروق</div>
                            <div className="text-3xl font-black tabular-nums" style={{ direction: 'ltr' }}>04:54:30</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full p-3 flex flex-col gap-2">
                        <div className="h-7 rounded-md bg-gradient-to-r from-emerald-700 to-emerald-900" />
                        <div className="flex-1 rounded-md bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center">
                          <span className="font-cairo text-emerald-300 text-xs">القالب الكلاسيكي الزمردي</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[0,1,2].map((i)=>(<div key={i} className="h-8 rounded-md bg-emerald-800/40 border border-emerald-700/30" />))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-cairo font-bold text-base">{t.nameAr}</h3>
                      {isApplied && (
                        <span className="text-[10px] font-cairo px-2 py-0.5 rounded-full bg-emerald-500 text-[#030a06] font-bold">
                          مطبَّق حالياً
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 font-cairo text-xs leading-relaxed mb-3">{t.description}</p>
                    <button
                      onClick={() => applyTemplateChoice(t.id)}
                      disabled={isApplied}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-cairo font-bold text-sm bg-gradient-to-r from-emerald-500 to-amber-500 text-[#030a06] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4" strokeWidth={3} />
                      {isApplied ? "مطبَّق حالياً" : `تطبيق ${t.nameAr}`}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {tab !== "template" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* List column */}
          <div className="space-y-3 order-2 md:order-1">
            {tab === "color" &&
              THEMES.map((t) => {
                const isSelected = selectedTheme === t.id;
                const isApplied = appliedTheme === t.id;
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => setSelectedTheme(t.id)}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-right rounded-2xl border p-4 transition-all relative ${
                      isSelected
                        ? "border-emerald-500/70 bg-emerald-900/30 shadow-lg shadow-emerald-900/30"
                        : "border-emerald-900/40 bg-emerald-950/20 hover:border-emerald-700/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-white font-cairo font-bold text-base">{t.nameAr}</h3>
                          {isApplied && (
                            <span className="text-[10px] font-cairo px-2 py-0.5 rounded-full bg-emerald-500 text-[#030a06] font-bold">
                              مطبَّق حالياً
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 font-cairo text-xs leading-relaxed">{t.description}</p>
                        <div className="flex items-center gap-1.5 mt-3">
                          {t.preview.map((c, i) => (
                            <span
                              key={i}
                              className="w-6 h-6 rounded-full border border-white/10"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500 text-[#030a06] flex items-center justify-center">
                          <Check className="w-5 h-5" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}

            {tab === "display" &&
              DISPLAY_MODES.map((m) => {
                const isSelected = selectedDisplay === m.id;
                const isApplied = appliedDisplay === m.id;
                return (
                  <motion.button
                    key={m.id}
                    onClick={() => setSelectedDisplay(m.id)}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-right rounded-2xl border p-4 transition-all relative ${
                      isSelected
                        ? "border-emerald-500/70 bg-emerald-900/30 shadow-lg shadow-emerald-900/30"
                        : "border-emerald-900/40 bg-emerald-950/20 hover:border-emerald-700/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-white font-cairo font-bold text-base">{m.nameAr}</h3>
                          {isApplied && (
                            <span className="text-[10px] font-cairo px-2 py-0.5 rounded-full bg-emerald-500 text-[#030a06] font-bold">
                              مطبَّق حالياً
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 font-cairo text-xs leading-relaxed">{m.description}</p>
                        {/* Mini shape preview */}
                        <div className="flex items-center gap-2 mt-3">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-10 h-7 bg-emerald-800/50 border border-emerald-600/40"
                              style={{
                                borderRadius: m.preview.radius,
                                boxShadow: m.preview.shadow === "none" ? "none" : m.preview.shadow,
                                backdropFilter: m.preview.blur ? `blur(${m.preview.blur}px)` : undefined,
                                backgroundColor: m.id === "glass" ? "rgba(255,255,255,0.07)" : undefined,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-500 text-[#030a06] flex items-center justify-center">
                          <Check className="w-5 h-5" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}

            <button
              onClick={tab === "color" ? resetColor : resetMode}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-800/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 px-4 py-3 font-cairo text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {tab === "color" ? "إرجاع اللون الأساسي" : "إرجاع نمط العرض الأساسي"}
            </button>
          </div>

          {/* Live preview */}
          <div className="order-1 md:order-2">
            <div className="md:sticky md:top-24">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-cairo text-gray-400">معاينة حية</span>
                <span className="text-xs font-cairo text-emerald-300">
                  {theme.nameAr} · {display.nameAr}
                </span>
              </div>

              <motion.div
                key={`${theme.id}-${display.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden border shadow-2xl"
                style={cardStyle({ backgroundColor: theme.tokens.bg, borderColor: theme.tokens.border, borderWidth })}
              >
                {/* Mini header */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ backgroundColor: theme.tokens.primary, color: theme.tokens.textOnPrimary }}
                >
                  <div className="font-cairo font-bold text-sm">القرآن الكريم</div>
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{ backgroundColor: theme.tokens.accent + "33", borderRadius: Math.min(display.preview.radius, 14) }}
                  >
                    <Palette className="w-3.5 h-3.5" style={{ color: theme.tokens.gold }} />
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Surah card */}
                  <div
                    className="p-4 flex items-center justify-between"
                    style={cardStyle({
                      background:
                        selectedDisplay === "glass"
                          ? "rgba(255,255,255,0.06)"
                          : `linear-gradient(135deg, ${theme.tokens.surface} 0%, ${theme.tokens.primary}55 100%)`,
                      borderColor: glassBorder(theme.tokens.border),
                      borderWidth,
                      borderStyle: "solid",
                    })}
                  >
                    <div>
                      <div className="font-cairo font-bold text-base" style={{ color: theme.tokens.gold }}>
                        سورة الفاتحة
                      </div>
                      <div className="font-cairo text-xs mt-0.5" style={{ color: theme.tokens.textOnPrimary + "aa" }}>
                        7 آيات · مكية
                      </div>
                    </div>
                    <div
                      className="w-12 h-12 flex items-center justify-center font-bold"
                      style={{ backgroundColor: theme.tokens.accent, color: theme.tokens.bg, borderRadius: Math.min(display.preview.radius, 16) }}
                    >
                      1
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="py-2.5 font-cairo text-sm font-bold flex items-center justify-center gap-2"
                      style={cardStyle({ backgroundColor: theme.tokens.accent, color: theme.tokens.bg, borderRadius: Math.min(display.preview.radius, 16) })}
                    >
                      <Play className="w-4 h-4" />
                      استمع
                    </button>
                    <button
                      className="py-2.5 font-cairo text-sm font-bold flex items-center justify-center gap-2 border"
                      style={cardStyle({ borderColor: theme.tokens.gold, color: theme.tokens.gold, backgroundColor: glassSurface(theme.tokens.surface), borderRadius: Math.min(display.preview.radius, 16) })}
                    >
                      <BookOpen className="w-4 h-4" />
                      اقرأ
                    </button>
                  </div>

                  {/* Ayah */}
                  <div
                    className="p-4 text-center"
                    style={cardStyle({ backgroundColor: glassSurface(theme.tokens.surface), borderColor: glassBorder(theme.tokens.border), borderWidth, borderStyle: "solid" })}
                  >
                    <div
                      className="text-2xl leading-loose"
                      style={{ color: theme.tokens.textOnPrimary, fontFamily: '"Amiri Quran", "Amiri", serif' }}
                    >
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </div>
                    <div className="font-cairo text-[11px] mt-2" style={{ color: theme.tokens.gold }}>
                      ﴿ ١ ﴾
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-cairo text-[11px]" style={{ color: theme.tokens.textOnPrimary + "aa" }}>
                      <span>التقدم اليومي</span>
                      <span style={{ color: theme.tokens.gold }}>62%</span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: theme.tokens.bg }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: "62%", background: `linear-gradient(90deg, ${theme.tokens.accent}, ${theme.tokens.gold})` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Apply button */}
              {(() => {
                const isApplied =
                  tab === "color"
                    ? appliedTheme === theme.id
                    : appliedDisplay === display.id;
                const label = isApplied
                  ? tab === "color"
                    ? "هذا اللون مطبَّق حالياً"
                    : "هذا النمط مطبَّق حالياً"
                  : tab === "color"
                    ? `تطبيق لون «${theme.nameAr}»`
                    : `تطبيق نمط «${display.nameAr}»`;
                return (
                  <motion.button
                    onClick={() =>
                      tab === "color" ? applyColor(theme.id) : applyMode(display.id)
                    }
                    disabled={isApplied}
                    aria-pressed={isApplied}
                    aria-live="polite"
                    whileTap={{ scale: isApplied ? 1 : 0.97 }}
                    whileHover={{ scale: isApplied ? 1 : 1.01 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3.5 font-cairo font-bold text-base disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                    style={applyButtonStyle(isApplied)}
                  >
                    <motion.span
                      key={`${isApplied}-${theme.id}-${display.id}`}
                      initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="inline-flex"
                    >
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </motion.span>
                    <span>{label}</span>
                  </motion.button>
                );
              })()}
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
