import FocusAreaPage from "@/components/marketing/focus-area-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Beauty Apprenticeship Education",
  description:
    "Structured cosmetology apprenticeship education, state board preparation, mentorship resources, and hands-on training for future professionals.",
  path: "/apprenticeships",
});

export default function Apprenticeships() {
  return (
    <FocusAreaPage
      title="Beauty Apprenticeships"
      description="We connect hands-on salon experience with structured, intentional education. Apprenticeships offer future professionals the opportunity to learn in a real environment, supported by strong mentorship and consistent education."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/beauty_apprenticeship_icon1.png"
      topics={["State Board Prep", "Stylist Resources", "Professional Development", "Hands-On Training"]}
    />
  );
}
