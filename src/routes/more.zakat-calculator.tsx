import { createFileRoute } from "@tanstack/react-router";
import ZakatCalculatorClient from "@/components/more/ZakatCalculatorClient";

export const Route = createFileRoute("/more/zakat-calculator")({
  head: () => ({ meta: [{ title: "حاسبة الزكاة" }] }),
  component: ZakatCalculatorClient,
});
