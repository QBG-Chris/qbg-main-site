import FocusAreaPage from "@/components/marketing/focus-area-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Continuing Education for Beauty Professionals",
  description:
    "Practical cosmetology, esthetics, business-building, and hands-on continuing education for licensed beauty professionals at every career stage.",
  path: "/licensed-professionals",
});

export default function LicensedProfessionals() {
  return(
    <FocusAreaPage
      title="Licensed Professionals"
      description="We help beauty professionals continue growing long after graduation. Whether you are newly licensed, rebuilding confidence, or looking for fresh inspiration, our practical, career-focused education can be applied directly in the salon."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/licensed_professional_icon1.png"
      topics={["Cosmetology", "Esthetics", "Business Building", "Hands-On Workshops"]}
    />
  );
}
