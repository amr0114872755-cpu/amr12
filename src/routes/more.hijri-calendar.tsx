import { createFileRoute } from "@tanstack/react-router";
import HijriCalendarClient from "@/components/more/HijriCalendarClient";

export const Route = createFileRoute("/more/hijri-calendar")({
  head: () => ({ meta: [{ title: "التقويم الهجري" }] }),
  component: HijriCalendarClient,
});
