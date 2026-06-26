import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListenPageClient from "@/components/listen/ListenPageClient";

export const Route = createFileRoute("/listen")({
  head: () => ({ meta: [{ title: "الاستماع للقرآن الكريم" }] }),
  component: () => (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar /><ListenPageClient /><Footer />
    </main>
  ),
});
