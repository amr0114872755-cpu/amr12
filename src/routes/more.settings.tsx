import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui-custom/BackButton";
import { Shield, FileText, Database, Info, Mail, Download, Bell, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/more/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — نور القرآن الكريم" },
      { name: "description", content: "إعدادات التطبيق، سياسة الخصوصية، شروط الاستخدام، وسياسة البيانات." },
      { property: "og:title", content: "الإعدادات — نور القرآن الكريم" },
      { property: "og:description", content: "إعدادات التطبيق وسياسات الخصوصية والاستخدام." },
    ],
  }),
  component: SettingsPage,
});

type Item = { to: string; label: string; desc: string; icon: typeof Shield; color: string };

const legalItems: Item[] = [
  { to: "/privacy", label: "سياسة الخصوصية", desc: "كيف نحمي بياناتك ونحترم خصوصيتك", icon: Shield, color: "text-emerald-300" },
  { to: "/terms", label: "شروط الاستخدام", desc: "الشروط والأحكام لاستخدام التطبيق", icon: FileText, color: "text-blue-300" },
  { to: "/data-policy", label: "سياسة البيانات", desc: "تفاصيل جمع ومعالجة البيانات (مطلوبة لـ Google Play)", icon: Database, color: "text-amber-300" },
];

const appItems: Item[] = [
  { to: "/more/downloads", label: "التحميلات (بدون نت)", desc: "إدارة الملفات المحفوظة للعمل أوفلاين", icon: Download, color: "text-indigo-300" },
];

function Section({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="mb-6">
      <h2 className="text-emerald-200/80 text-sm font-semibold mb-3 px-1">{title}</h2>
      <ul className="space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className={`shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${it.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium">{it.label}</div>
                  <div className="text-white/60 text-sm mt-0.5">{it.desc}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <BackButton />
        <header className="mt-4 mb-6">
          <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
          <p className="text-white/60 mt-2">إدارة التطبيق والاطلاع على السياسات القانونية.</p>
        </header>

        <Section title="السياسات القانونية" items={legalItems} />
        <Section title="التطبيق" items={appItems} />

        <section className="mb-6">
          <h2 className="text-emerald-200/80 text-sm font-semibold mb-3 px-1">حول التطبيق</h2>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2"><Info size={16} className="text-emerald-300" /><span>الاسم: نور القرآن الكريم</span></div>
            <div className="flex items-center gap-2"><RefreshCw size={16} className="text-emerald-300" /><span>الإصدار: 1.0.3</span></div>
            <div className="flex items-center gap-2"><Bell size={16} className="text-emerald-300" /><span>تنبيهات الصلاة والأذكار اختيارية</span></div>
            <div className="flex items-center gap-2"><Mail size={16} className="text-emerald-300" /><span>للتواصل: عبر صفحة «اتصل بنا» في الصفحة الرئيسية</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
