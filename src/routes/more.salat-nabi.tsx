import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import SalatNabiClient from "@/components/more/SalatNabiClient";

export const Route = createFileRoute("/more/salat-nabi")({
  head: () => ({
    meta: [
      { title: "الصلاة على النبي ﷺ — تذكير دوري" },
      { name: "description", content: "تذكير دوري بالصلاة على النبي محمد ﷺ بصوت وإشعار قابل للتحكم الكامل." },
      { property: "og:title", content: "الصلاة على النبي ﷺ" },
      { property: "og:description", content: "تذكير دوري بالصلاة على النبي محمد ﷺ بصوت وإشعار قابل للتحكم." },
    ],
  }),
  component: SalatNabiClient,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#030a06] px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-emerald-300 font-cairo">حدث خطأ غير متوقع</h1>
          <p className="text-gray-400 font-cairo">تعذّر تحميل صفحة الصلاة على النبي ﷺ. حاول مجدداً.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { router.invalidate(); reset(); }}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-cairo"
            >
              إعادة المحاولة
            </button>
            <Link to="/" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-cairo">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#030a06] px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-emerald-300 font-cairo">الصفحة غير موجودة</h1>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-cairo">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  ),
});
