import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import ProgressPageClient from "@/components/progress/ProgressPageClient";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "تقدم الحفظ - القرآن الكريم" }] }),
  component: () => (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar /><ProgressPageClient />
    </main>
  ),
});
