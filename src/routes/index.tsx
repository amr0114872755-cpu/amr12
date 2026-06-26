import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import SurahListSection from "@/components/home/SurahListSection";
import { FajrHome } from "@/components/templates/FajrHome";
import { readStoredAppTemplate, type AppTemplateId, DEFAULT_APP_TEMPLATE, APP_TEMPLATE_CHANGED_EVENT } from "@/lib/appTemplates";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [template, setTemplate] = useState<AppTemplateId>(DEFAULT_APP_TEMPLATE);
  useEffect(() => {
    setTemplate(readStoredAppTemplate());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'app:template') setTemplate(readStoredAppTemplate());
    };
    const onChange = () => setTemplate(readStoredAppTemplate());
    window.addEventListener('storage', onStorage);
    window.addEventListener(APP_TEMPLATE_CHANGED_EVENT, onChange as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(APP_TEMPLATE_CHANGED_EVENT, onChange as EventListener);
    };
  }, []);

  if (template === 'fajr') {
    return (
      <FajrHome />
    );
  }

  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SurahListSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
