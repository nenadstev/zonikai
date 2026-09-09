import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { aboutContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
