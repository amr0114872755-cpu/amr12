import { createFileRoute } from "@tanstack/react-router";
import NamesClient from "@/components/more/NamesClient";

export const Route = createFileRoute("/more/names")({
  head: () => ({ meta: [{ title: "أسماء الله الحسنى" }] }),
  component: NamesClient,
});
