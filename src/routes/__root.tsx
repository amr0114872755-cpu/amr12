import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { AudioProvider } from "@/components/providers/AudioProvider";
import { FloatingContact } from "@/components/ui-custom/FloatingContact";
import { BackButton } from "@/components/ui-custom/BackButton";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ActivityTracker } from "@/components/providers/ActivityTracker";
import { UpdateBanner } from "@/components/ui-custom/UpdateBanner";
import { FridayReminder } from "@/components/ui-custom/FridayReminder";
import { GlobalNotificationPrompt } from "@/components/ui-custom/GlobalNotificationPrompt";
import { UpdateModal } from "@/components/native/UpdateModal";
import { UpdateReminder } from "@/components/ui-custom/UpdateReminder";
import { AppSplashScreen } from "@/components/native/SplashScreen";
import { NativeBackHandler } from "@/components/native/NativeBackHandler";
import { Toaster } from "@/components/ui/sonner";
import { FajrBottomTab } from "@/components/templates/FajrBottomTab";
import { FajrNavbar } from "@/components/templates/FajrNavbar";
import { ThemeQuickButton } from "@/components/ui-custom/ThemeQuickButton";
import {
  readStoredAppTemplate,
  type AppTemplateId,
  DEFAULT_APP_TEMPLATE,
  APP_TEMPLATE_CHANGED_EVENT,
} from "@/lib/appTemplates";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030a06] px-4">
      <div className="max-w-md text-center" dir="rtl">
        <h1 className="text-7xl font-bold gradient-emerald-gold">404</h1>
        <h2 className="mt-4 text-xl font-cairo font-semibold text-white">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-gray-400 font-cairo">
          الصفحة التي تبحث عنها غير متوفرة
        </p>
        <a href="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors font-cairo">
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030a06] px-4" dir="rtl">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-white font-cairo">حدث خطأ ما</h1>
        <p className="mt-2 text-sm text-gray-400 font-cairo">يرجى المحاولة مرة أخرى</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-500 font-cairo"
          >
            إعادة المحاولة
          </button>
          <a href="/" className="rounded-md border border-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-900/30 font-cairo">
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_DESCRIPTION = "منصة إسلامية شاملة تضم القرآن الكريم، الأذكار، الرقية الشرعية، الأذان، والسبحة الإلكترونية؛ رفيقك اليومي للعبادة والتقرب إلى الله.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#065f46" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "نور القرآن" },
      { title: "نور القرآن الكريم - اقرأ واستمع للقرآن الكريم" },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: "القرآن الكريم, قراءة القرآن, الاستماع للقرآن, تلاوة, سور القرآن, إسلام" },
      { property: "og:title", content: "نور القرآن الكريم - اقرأ واستمع للقرآن الكريم" },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_EG" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "نور القرآن الكريم - اقرأ واستمع للقرآن الكريم" },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HYdj9yREm6XE90BpbkyYkp2bAyj1/social-images/social-1780629932036-photo_2026-06-05_06-25-17.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HYdj9yREm6XE90BpbkyYkp2bAyj1/social-images/social-1780629932036-photo_2026-06-05_06-25-17.webp" },
      { name: "description", content: "A premium Arabic Islamic Quran platform for learning Quranic recitation with AI-powered pronunciation feedback." },
      { property: "og:description", content: "A premium Arabic Islamic Quran platform for learning Quranic recitation with AI-powered pronunciation feedback." },
      { name: "twitter:description", content: "A premium Arabic Islamic Quran platform for learning Quranic recitation with AI-powered pronunciation feedback." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          // Apply the saved theme + display mode before paint to avoid a flash of defaults.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('app:theme');if(t&&['default','firouz','layali','dhahab'].indexOf(t)>=0){document.documentElement.classList.add('theme-'+t);}var d=localStorage.getItem('app:display');if(d&&['glass','soft','minimal','elevated'].indexOf(d)>=0){document.documentElement.classList.add('display-'+d);}var a=localStorage.getItem('app:template');if(a&&['fajr','prayer-now'].indexOf(a)>=0){document.documentElement.classList.add('app-template-fajr');var n=localStorage.getItem('fajr:night');if(n==='1'){document.documentElement.classList.add('fajr-night');}}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-cairo bg-[#030a06] text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [splashDone, setSplashDone] = useState(false);
  const [template, setTemplate] = useState<AppTemplateId>(DEFAULT_APP_TEMPLATE);

  useEffect(() => {
    setTemplate(readStoredAppTemplate());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "app:template") setTemplate(readStoredAppTemplate());
    };
    const onChange = () => setTemplate(readStoredAppTemplate());
    window.addEventListener("storage", onStorage);
    window.addEventListener(APP_TEMPLATE_CHANGED_EVENT, onChange as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(APP_TEMPLATE_CHANGED_EVENT, onChange as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppSplashScreen onDone={() => setSplashDone(true)} />
      {splashDone && (
        <FavoritesProvider>
          <ProgressProvider>
            <AudioProvider>
              <Outlet />
              <BackButton />
              <FloatingContact />
              <AudioPlayer />
              <ActivityTracker />
              <UpdateBanner />
              <FridayReminder />
              <GlobalNotificationPrompt />
              <UpdateModal />
              <UpdateReminder />
              <NativeBackHandler />
              <Toaster position="top-center" richColors closeButton dir="rtl" />
              {template === "fajr" && (
                <>
                  <FajrNavbar />
                  <ThemeQuickButton />
                  <FajrBottomTab />
                </>
              )}
            </AudioProvider>
          </ProgressProvider>
        </FavoritesProvider>
      )}
    </QueryClientProvider>
  );
}
