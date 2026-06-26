import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock4,
  Compass,
  HeartHandshake,
  BookMarked,
  Sparkles,
  MessageSquare,
  Shield,
  HandHeart,
  Calculator,
  Calendar,
  Mic,
  GraduationCap,
  Download,
  Settings2,
  Palette,
  LayoutGrid,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/more/")({
  head: () => ({
    meta: [
      { title: "المزيد — كل المزايا" },
      { name: "description", content: "كل مزايا التطبيق في مكان واحد: مواقيت الصلاة، الأذكار، التسبيح، القبلة، أسماء الله الحسنى، الأحاديث، الرقية والمزيد." },
      { property: "og:title", content: "المزيد — كل المزايا" },
      { property: "og:description", content: "كل مزايا التطبيق في مكان واحد." },
    ],
  }),
  component: MorePage,
});

type Item = {
  to: string;
  label: string;
  desc: string;
  Icon: typeof Clock4;
};

const ITEMS: Item[] = [
  { to: "/more/prayer-times", label: "مواقيت الصلاة", desc: "أوقات الصلاة والأذان", Icon: Clock4 },
  { to: "/more/qibla", label: "اتجاه القبلة", desc: "بوصلة لتحديد القبلة", Icon: Compass },
  { to: "/more/athkar", label: "الأذكار", desc: "أذكار الصباح والمساء", Icon: BookMarked },
  { to: "/more/tasbeeh", label: "السبحة", desc: "سبحة إلكترونية", Icon: HeartHandshake },
  { to: "/more/names", label: "أسماء الله الحسنى", desc: "الأسماء التسعة والتسعون", Icon: Sparkles },
  { to: "/more/prophets-stories", label: "قصص الأنبياء", desc: "قصص الأنبياء الـ25 في القرآن", Icon: Users },
  { to: "/more/hadith", label: "الأحاديث", desc: "كتب الحديث الشريف", Icon: MessageSquare },
  { to: "/more/ruqyah", label: "الرقية الشرعية", desc: "آيات وأدعية", Icon: Shield },
  { to: "/more/salat-nabi", label: "الصلاة على النبي", desc: "صيغ الصلاة على النبي ﷺ", Icon: HandHeart },
  { to: "/more/zakat-calculator", label: "حاسبة الزكاة", desc: "احسب زكاة المال", Icon: Calculator },
  { to: "/more/hijri-calendar", label: "التقويم الهجري", desc: "تقويم وتواريخ هجرية", Icon: Calendar },
  { to: "/more/quran-learning", label: "تعلّم التلاوة", desc: "تجويد ونطق صحيح", Icon: Mic },
  { to: "/more/islamic-education", label: "التعليم الإسلامي", desc: "دروس ومقالات", Icon: GraduationCap },
  { to: "/more/downloads", label: "التنزيلات", desc: "الملفات المحفوظة", Icon: Download },
  { to: "/more/themes", label: "شكل التطبيق", desc: "الألوان والقوالب", Icon: Palette },
  { to: "/more/settings", label: "الإعدادات", desc: "إعدادات التطبيق", Icon: Settings2 },
];

function MorePage() {
  return (
    <main className="min-h-screen pt-20 pb-28 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-emerald-700/15 px-3 py-1.5 text-emerald-800 font-cairo text-xs font-bold shadow-sm hover:bg-white transition"
          >
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Link>
          <div className="inline-flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-emerald-400" />
            <h1 className="font-cairo font-bold text-xl text-white">المزيد</h1>
          </div>
        </div>

        <p className="font-cairo text-sm text-gray-300 mb-6 text-center">
          كل مزايا التطبيق في مكان واحد — اختر ما تريد.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {ITEMS.map(({ to, label, desc, Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-emerald-700/15 bg-white/90 hover:bg-white p-4 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition"
            >
              <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6" strokeWidth={2} />
              </span>
              <span className="font-cairo font-bold text-sm text-emerald-900">{label}</span>
              <span className="font-cairo text-[11px] text-emerald-700/70 leading-snug">{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}