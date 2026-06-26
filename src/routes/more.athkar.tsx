import { createFileRoute } from "@tanstack/react-router";
import AthkarClient from "@/components/more/AthkarClient";

export const Route = createFileRoute("/more/athkar")({
  head: () => ({ meta: [{ title: "الأذكار اليومية" }] }),
  component: AthkarClient,
});
