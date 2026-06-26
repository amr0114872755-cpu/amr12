import { createFileRoute } from "@tanstack/react-router";
import ProphetsStoriesClient from "@/components/more/ProphetsStoriesClient";

export const Route = createFileRoute("/more/prophets-stories")({
  head: () => ({
    meta: [
      { title: "قصص الأنبياء — الأنبياء الخمسة والعشرون في القرآن" },
      {
        name: "description",
        content:
          "قصص الأنبياء الخمسة والعشرين المذكورين في القرآن الكريم كاملة مع الآيات المرتبطة والعبر والدروس المستفادة.",
      },
      { property: "og:title", content: "قصص الأنبياء — الأنبياء الخمسة والعشرون في القرآن" },
      {
        property: "og:description",
        content: "قصص الأنبياء كاملة مع الآيات والعبر والدروس.",
      },
    ],
  }),
  component: ProphetsStoriesClient,
});
