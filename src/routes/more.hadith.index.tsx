import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import HadithClient from "@/components/more/HadithClient";

export const Route = createFileRoute("/more/hadith/")({
  head: () => ({ meta: [{ title: "الأحاديث النبوية" }] }),
  component: () => (
    <>
      <Navbar />
      <HadithClient />
    </>
  ),
});
