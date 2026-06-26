import { createFileRoute } from "@tanstack/react-router";
import QiblaClient from "@/components/more/QiblaClient";

export const Route = createFileRoute("/more/qibla")({
  head: () => ({ meta: [{ title: "اتجاه القبلة" }] }),
  component: QiblaClient,
});
