import BlogPageContent from "@/components/BlogPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | 4unik",
  description:
    "Insights, tendências e guias sobre employee engagement, gamificação e logística de premiações corporativas.",
};

export default function BlogPage() {
  return <BlogPageContent />;
}
