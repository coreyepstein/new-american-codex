import { Metadata } from "next";
import { PersonalizePage } from "@/components/PersonalizePage";

export const metadata: Metadata = {
  title: "Personalize | The New American Codex",
  description:
    "Generate a personalized week of curriculum tailored to your child's interests and learning style.",
};

export default function Page() {
  return <PersonalizePage />;
}
