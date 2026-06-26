import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import HadithBookClient from "@/components/more/HadithBookClient";

export const Route = createFileRoute("/more/hadith/$book")({
  head: () => ({ meta: [{ title: "كتاب الحديث" }] }),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useParams();
  return (
    <>
      <Navbar />
      <HadithBookClient bookSlug={book} />
    </>
  );
}
