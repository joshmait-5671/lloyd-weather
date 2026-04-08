import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapter DNA | Only Lloyd Knows",
  description:
    "Discover your weather personality. Pick your city, answer 8 questions, and find out what kind of weather person you really are.",
};

export default function ChapterDNALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
