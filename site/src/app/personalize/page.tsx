import { Metadata } from "next";
import { PersonalizePage } from "@/components/PersonalizePage";

export const metadata: Metadata = {
  title: "Personalize | The New American Codex",
  description:
    "Generate a personalized week of curriculum tailored to your child's interests and learning style.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; modality?: string }>;
}) {
  const params = await searchParams;
  return (
    <PersonalizePage
      defaultStage={params.stage}
      defaultModality={params.modality}
    />
  );
}
