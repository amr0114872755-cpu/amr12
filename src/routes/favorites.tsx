import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FavoritesPageClient from "@/components/favorites/FavoritesPageClient";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "المفضلة - القرآن الكريم" }] }),
  component: () => (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar /><FavoritesPageClient /><Footer />
    </main>
  ),
});
