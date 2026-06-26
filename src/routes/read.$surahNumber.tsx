import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import SurahReader from "@/components/read/SurahReader";

export const Route = createFileRoute("/read/$surahNumber")({
  component: SurahPage,
});

function SurahPage() {
  const { surahNumber } = Route.useParams();
  return (
    <main className="min-h-screen bg-[#030a06]">
      <Navbar />
      <SurahReader surahNumber={parseInt(surahNumber, 10)} />
    </main>
  );
}
