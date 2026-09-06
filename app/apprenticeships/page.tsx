import type { Metadata } from "next";
import FocusAreaPage from "@/components/marketing/focus-area-page";

export const metadata: Metadata = { title: "Apprenticeships", description: "Hands-on cosmetology education focused on confident, consistent salon results." };

export default function Apprenticeships() {
  return (
    <FocusAreaPage
      title="Beauty Apprenticeships"
      description="We help connect the hands on salon experience with structured intentional education. Apprenticeships offers future professionals the opportunity to learn in a real environment but strong mentorship and consistent education are essential to a successful experience."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/beauty_apprenticeship_icon1.png"
      topics={["State Board Prep", "Stylist Resources", "Professional Development", "Hands-On Training"]}
    />
  );
}
