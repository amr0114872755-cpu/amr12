import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import TasbeehPageClient from "@/components/more/TasbeehPageClient";

export const Route = createFileRoute("/more/tasbeeh")({
  head: () => ({ meta: [{ title: "السبحة الإلكترونية" }] }),
  component: () => (<main className="min-h-screen bg-[#030a06]"><Navbar /><TasbeehPageClient /></main>),
});
