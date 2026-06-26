import { createFileRoute } from "@tanstack/react-router";
import IslamicEducationClient from "@/components/more/IslamicEducationClient";

export const Route = createFileRoute("/more/islamic-education")({
  head: () => ({ meta: [{ title: "تعليم الإسلام" }] }),
  component: IslamicEducationClient,
});
