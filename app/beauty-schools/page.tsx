import FocusAreaPage from "@/components/marketing/focus-area-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Beauty School Curriculum Support",
  description:
    "Curriculum support, career readiness, professional development, and hands-on workshops designed for modern beauty schools and their students.",
  path: "/beauty-schools",
});

export default function Business() {
  return(
    <FocusAreaPage
      title="Beauty Schools"
      description="We partner with beauty schools to strengthen the connection between classroom education and the realities of today’s salon industry. Our programs complement mandated curriculum with real-world scenarios designed to improve adult learner retention."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/beauty_school_icon2.png"
      topics={["Curriculum Support", "Professional Development", "Career Readiness", "Hands-On Workshops"]}
    />
  );
}
