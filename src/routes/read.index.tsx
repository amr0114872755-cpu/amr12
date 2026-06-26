import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReadPageClient from "@/components/read/ReadPageClient";

export const Route = createFileRoute("/read/")({
  head: () => ({ meta: [{ title: "قراءة القرآن الكريم" }] }),
  component: () => (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar /><ReadPageClient /><Footer />
    </main>
  ),
});
