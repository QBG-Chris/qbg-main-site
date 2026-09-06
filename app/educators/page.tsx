import FocusAreaPage from "@/components/marketing/focus-area-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Beauty Educator Development",
  description:
    "Professional development, curriculum support, and facilitation resources that help beauty educators create engaging, effective learning experiences.",
  path: "/educators",
});

export default function Education() {
  return(
    <FocusAreaPage
      title="Beauty Educators"
      description="We equip educators with modern tools, resources, and professional development designed for today’s classroom and salon learning environment. Great technical knowledge does not always translate to strong adult learner retention, so we help educators strengthen both what they teach and how they teach it."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/educator_icon.png"
      topics={["Educator Empowerment", "Curriculum Support", "Facilitating Resources", "Industry Focused Training"]}
    />
  );
}
