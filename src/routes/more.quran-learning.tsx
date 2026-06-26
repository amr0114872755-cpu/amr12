import { createFileRoute } from "@tanstack/react-router";
import QuranLearningClient from "@/components/more/QuranLearningClient";

export const Route = createFileRoute("/more/quran-learning")({
  head: () => ({
    meta: [
      { title: "تعلّم تلاوة القرآن الكريم" },
      {
        name: "description",
        content:
          "تعلّم تلاوة القرآن الكريم وأحكام التجويد مع تقييم النطق بالذكاء الاصطناعي واختيار أصوات كبار القراء",
      },
    ],
  }),
  component: QuranLearningClient,
});