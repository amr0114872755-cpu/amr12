import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui-custom/BackButton";

export const Route = createFileRoute("/data-policy")({
  head: () => ({
    meta: [
      { title: "سياسة البيانات — نور القرآن الكريم" },
      { name: "description", content: "تفاصيل جمع ومعالجة البيانات (Data Safety) لتطبيق نور القرآن الكريم." },
      { property: "og:title", content: "سياسة البيانات — نور القرآن الكريم" },
      { property: "og:description", content: "إفصاح كامل عن البيانات وفق متطلبات Google Play Data Safety." },
    ],
  }),
  component: DataPolicyPage,
});

type Row = { type: string; collected: boolean; shared: boolean; optional: boolean; purpose: string };

const rows: Row[] = [
  { type: "الاسم / البريد الإلكتروني / رقم الهاتف", collected: false, shared: false, optional: false, purpose: "—" },
  { type: "جهات الاتصال", collected: false, shared: false, optional: false, purpose: "—" },
  { type: "الصور والملفات الشخصية", collected: false, shared: false, optional: false, purpose: "—" },
  { type: "الموقع الجغرافي (تقريبي)", collected: true, shared: false, optional: true, purpose: "حساب مواقيت الصلاة واتجاه القبلة فقط — لا يُرسل لأي خادم" },
  { type: "معرّف Web Push", collected: true, shared: false, optional: true, purpose: "إرسال إشعارات الصلاة والأذكار (مجهول الهوية)" },
  { type: "ملفات صوتية محفوظة", collected: true, shared: false, optional: true, purpose: "تشغيل التلاوات بدون إنترنت — تُخزّن على جهازك فقط" },
  { type: "تفضيلات التطبيق (الخط، القارئ، المفضلة)", collected: true, shared: false, optional: false, purpose: "حفظ إعداداتك محلياً على الجهاز" },
  { type: "بيانات الاستخدام / التحليلات", collected: false, shared: false, optional: false, purpose: "—" },
  { type: "إعلانات / Ad ID", collected: false, shared: false, optional: false, purpose: "—" },
];

function Cell({ value }: { value: boolean }) {
  return (
    <span className={value ? "text-amber-300" : "text-emerald-300"}>
      {value ? "نعم" : "لا"}
    </span>
  );
}

function DataPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-4xl text-white/85 leading-relaxed">
        <BackButton />
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">سياسة البيانات (Data Safety)</h1>
        <p className="text-white/60 mb-6">
          هذه الصفحة تُلخّص جدول إفصاح البيانات المطلوب من Google Play. آخر تحديث: 15 يونيو 2026.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
          <h2 className="text-emerald-300 font-bold mb-2">ملخص سريع</h2>
          <ul className="list-disc pr-6 space-y-1 text-sm">
            <li>التطبيق <strong>لا يجمع</strong> بيانات شخصية تعريفية.</li>
            <li>التطبيق <strong>لا يشارك</strong> أي بيانات مع أطراف ثالثة.</li>
            <li>جميع البيانات الاختيارية (الموقع، الإشعارات) تتطلب موافقتك الصريحة.</li>
            <li>التطبيق <strong>لا يحتوي على إعلانات</strong> ولا أدوات تتبع تجاري.</li>
            <li>الاتصال بالخوادم مشفّر عبر HTTPS.</li>
          </ul>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/10 text-emerald-200">
              <tr>
                <th className="p-3 text-right">نوع البيانات</th>
                <th className="p-3">مجموعة؟</th>
                <th className="p-3">مُشاركة؟</th>
                <th className="p-3">اختيارية؟</th>
                <th className="p-3 text-right">الغرض</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.type} className="border-t border-white/10">
                  <td className="p-3 text-right">{r.type}</td>
                  <td className="p-3 text-center"><Cell value={r.collected} /></td>
                  <td className="p-3 text-center"><Cell value={r.shared} /></td>
                  <td className="p-3 text-center">{r.collected ? <Cell value={r.optional} /> : "—"}</td>
                  <td className="p-3 text-right text-white/70">{r.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-bold text-emerald-300">ممارسات الأمان</h2>
          <ul className="list-disc pr-6 space-y-1">
            <li>كل البيانات الحساسة مُشفّرة أثناء النقل (HTTPS/TLS).</li>
            <li>يمكنك طلب حذف البيانات بإلغاء تثبيت التطبيق أو مسح بياناته من إعدادات Android.</li>
            <li>التطبيق يلتزم بسياسات Google Play لحماية الأسرة وملاءمة جميع الأعمار.</li>
          </ul>
        </section>

        <section className="mt-6 space-y-3">
          <h2 className="text-xl font-bold text-emerald-300">مراجع</h2>
          <p className="text-sm text-white/70">
            راجع أيضاً: <a href="/privacy" className="text-emerald-300 underline">سياسة الخصوصية</a> و
            <a href="/terms" className="text-emerald-300 underline mr-1">شروط الاستخدام</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
