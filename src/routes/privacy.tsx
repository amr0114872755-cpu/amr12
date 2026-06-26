import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui-custom/BackButton";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — نور القرآن الكريم" },
      { name: "description", content: "سياسة الخصوصية لتطبيق نور القرآن الكريم — احترام كامل لخصوصية المستخدم." },
      { property: "og:title", content: "سياسة الخصوصية — نور القرآن الكريم" },
      { property: "og:description", content: "كيف يتعامل التطبيق مع بياناتك ويحترم خصوصيتك." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-3xl text-white/85 leading-relaxed">
        <BackButton />
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">سياسة الخصوصية</h1>
        <p className="text-white/60 mb-6">آخر تحديث: 15 يونيو 2026</p>

        <section className="space-y-4">
          <p>
            نحن في تطبيق <strong>«نور القرآن الكريم»</strong> نلتزم بحماية خصوصية مستخدمينا.
            هذه السياسة توضّح ما إذا كنا نجمع أي بيانات وكيف نتعامل معها.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">١. البيانات التي لا نجمعها</h2>
          <p>
            التطبيق <strong>لا يجمع</strong> أي بيانات شخصية تعريفية مثل: الاسم، البريد الإلكتروني،
            رقم الهاتف، أو جهات الاتصال. لا يوجد تسجيل دخول أو إنشاء حساب.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٢. البيانات التي تُحفظ على جهازك فقط</h2>
          <ul className="list-disc pr-6 space-y-1">
            <li>المفضلة والآيات المحفوظة.</li>
            <li>تقدم القراءة وآخر سورة تم فتحها.</li>
            <li>إعدادات الخط، حجم النص، والقارئ المفضّل.</li>
            <li>الملفات الصوتية المُحمَّلة للاستخدام بدون إنترنت.</li>
          </ul>
          <p>كل هذه البيانات تبقى على جهازك ولا تُرسل لأي خادم.</p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٣. الأذونات التي قد يطلبها التطبيق</h2>
          <ul className="list-disc pr-6 space-y-1">
            <li><strong>الموقع الجغرافي</strong>: فقط لحساب مواقيت الصلاة واتجاه القبلة. لا يُرسل لأي جهة.</li>
            <li><strong>الإشعارات</strong>: لتنبيهك بأوقات الصلاة والأذكار اليومية. اختياري.</li>
            <li><strong>التخزين</strong>: لحفظ التلاوات الصوتية للاستماع بدون إنترنت.</li>
          </ul>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٤. خدمات الطرف الثالث</h2>
          <p>
            عند تفعيلك للإشعارات، يستخدم التطبيق خدمة <strong>Web Push</strong> لإرسال التنبيهات.
            لا يُرسل سوى معرّف الاشتراك المجهول، ولا يحتوي على أي بيانات شخصية.
          </p>
          <p>
            التلاوات الصوتية تُحمَّل من خوادم عامة (مثل EveryAyah وMP3Quran)، وقد تسجّل تلك الخوادم
            عنوان IP الخاص بك وفق سياساتها الخاصة.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٥. الإعلانات والتحليلات</h2>
          <p>
            التطبيق <strong>لا يحتوي على إعلانات</strong> ولا أدوات تتبع إعلاني (Google Ads, Facebook Pixel, إلخ).
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٦. الأطفال</h2>
          <p>
            التطبيق مناسب لجميع الأعمار ولا يجمع أي بيانات من القاصرين.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٧. حذف البيانات</h2>
          <p>
            يمكنك حذف جميع البيانات المخزّنة على جهازك بإلغاء تثبيت التطبيق، أو بمسح بيانات التطبيق
            من إعدادات نظام Android.
          </p>

          <h2 className="text-xl font-bold text-emerald-300 mt-6">٨. التواصل</h2>
          <p>
            لأي استفسار حول هذه السياسة، تواصل معنا عبر صفحة «اتصل بنا» في الصفحة الرئيسية.
          </p>
        </section>
      </div>
    </main>
  );
}
