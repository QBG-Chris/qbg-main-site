import type { Metadata } from "next";
import FocusAreaPage from "@/components/marketing/focus-area-page";

export const metadata: Metadata = { title: "Educator Development", description: "Learn how to build, facilitate, and improve engaging beauty education." };

export default function Education() {
  return(
    <FocusAreaPage
      title="Beauty Educators"
      description="We equip educators with modern tools, resources, and professional development designed for todays classroom and salon learning environment. Great technical knowledge does not always translate to great adult learner retention, which is why we focus on helping educators strengthen both what they teach with how they teach it."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/educator_icon.png"
      topics={["Educator Empowerment", "Curriculum Support", "Facilitating Resources", "Industry Focused Training"]}
    />
  );
}
