import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchPageClient from "@/components/search/SearchPageClient";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "البحث في القرآن الكريم" }] }),
  component: () => (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar /><SearchPageClient /><Footer />
    </main>
  ),
});
