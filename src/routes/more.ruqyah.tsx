import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import RuqyahClient from "@/components/more/RuqyahClient";

export const Route = createFileRoute("/more/ruqyah")({
  head: () => ({ meta: [{ title: "الرقية الشرعية" }] }),
  component: () => (
    <>
      <Navbar />
      <RuqyahClient />
    </>
  ),
});
