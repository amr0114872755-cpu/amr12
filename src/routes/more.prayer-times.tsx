import { createFileRoute } from "@tanstack/react-router";
import PrayerTimesClient from "@/components/more/PrayerTimesClient";

export const Route = createFileRoute("/more/prayer-times")({
  head: () => ({ meta: [{ title: "مواقيت الصلاة" }] }),
  component: PrayerTimesClient,
});
