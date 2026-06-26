import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui-custom/BackButton";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "شروط الاستخدام — نور القرآن الكريم" },
      { name: "description", content: "شروط وأحكام استخدام تطبيق نور القرآن الكريم." },
      { property: "og:title", content: "شروط الاستخدام — نور القرآن الكريم" },
      { property: "og:description", content: "الشروط والأحكام لاستخدام التطبيق." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-3xl text-white/85 leading-relaxed">
        <BackButton />
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">شروط الاستخدام</h1>
        <p className="text-white/60 mb-6">آخر تحديث: 15 يونيو 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-300 mt-4">١. قبول الشروط</h2>
          <p>
            باستخدامك تطبيق <strong>«نور القرآن الكريم»</strong>، فإنك توافق على هذه الشروط.
            إذا لم توافق، يُرجى عدم استخدام التطبيق.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٢. الغرض من التطبيق</h2>
          <p>
            التطبيق مجاني بالكامل ويوفّر القرآن الكريم وتفسيره وتلاواته، إضافة إلى أذكار ومواقيت
            صلاة وأحاديث نبوية، لخدمة المسلمين حول العالم. لا غرض تجاري.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٣. الاستخدام المسموح</h2>
          <ul className="list-disc pr-6 space-y-1">
            <li>الاستخدام الشخصي والتعليمي.</li>
            <li>مشاركة الآيات والأذكار مع الآخرين.</li>
            <li>تحميل التلاوات للاستماع بدون إنترنت.</li>
          </ul>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٤. الاستخدام غير المسموح</h2>
          <ul className="list-disc pr-6 space-y-1">
            <li>تعديل التطبيق أو هندسته العكسية بقصد ضار.</li>
            <li>استخدام التطبيق لأي غرض غير شرعي أو مخالف لتعاليم الإسلام.</li>
            <li>إعادة بيع التطبيق أو محتوياته.</li>
          </ul>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٥. حقوق المحتوى</h2>
          <p>
            القرآن الكريم وتفسيره ملك للأمة الإسلامية جمعاء ولا تُحفظ عليه حقوق ملكية.
            التلاوات الصوتية مأخوذة من مصادر عامة (EveryAyah، MP3Quran) وحقوقها لأصحابها.
            تصميم التطبيق وواجهته من إنتاج المطوّر.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٦. إخلاء المسؤولية</h2>
          <p>
            نبذل قصارى جهدنا لضمان دقة المحتوى الديني (نص القرآن، التفاسير، الأحاديث)،
            لكن لا نتحمل مسؤولية أي خطأ غير مقصود. يُنصح بالرجوع لأهل العلم في المسائل الفقهية.
          </p>
          <p>
            مواقيت الصلاة محسوبة فلكياً بناءً على موقعك، وقد تختلف بدقائق عن المواقيت المحلية الرسمية.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٧. التحديثات</h2>
          <p>
            قد نُحدّث التطبيق وهذه الشروط من وقت لآخر. الاستمرار في استخدام التطبيق بعد التحديث
            يُعدّ موافقة على الشروط الجديدة.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٨. القانون الحاكم</h2>
          <p>
            تخضع هذه الشروط لأحكام الشريعة الإسلامية والقوانين المعمول بها في بلد الاستخدام.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٩. التواصل</h2>
          <p>
            لأي استفسار، تواصل معنا عبر صفحة «اتصل بنا» في الصفحة الرئيسية.
          </p>
        </section>
      </div>
    </main>
  );
}
