import type { Metadata } from "next";
import FocusAreaPage from "@/components/marketing/focus-area-page";

export const metadata: 
  Metadata = {
    title: "Beauty Business Education",
    description: "Practical business education for salon owners and independent beauty professionals." };

export default function Business() {
  return(
    <FocusAreaPage
      title="Beauty Schools"
      description="We partner with beauty schools to help strengthen the connection between classroom education to the realities of todays salon industry. Our programs are designed to compliment existing mandated cirriculum to real world scenarios to keep adult learner retention high!"
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/beauty_school_icon2.png"
      topics={["Curriculum Support", "Professional Development", "Career Readiness", "Hands-On Workshops"]}
    />
  );
}
