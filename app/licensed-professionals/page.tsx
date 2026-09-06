import type { Metadata } from "next";
import FocusAreaPage from "@/components/marketing/focus-area-page";

export const metadata: Metadata = { title: "Licensed Professionals Classes", description: "Modern esthetics education across skin, lashes, waxing, and makeup." };

export default function LicensedProfessionals() {
  return(
    <FocusAreaPage
      title="Licensed Professionals"
      description="We help beauty professionals who want to continue growing long after graduation; whether you are newly licensed, rebuilding confidence, or looking for fresh inspiration, we provide practical career focused education that can be applied directly in the salon."
      image="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/licensed_professional_icon1.png"
      topics={["Cosmetology", "Esthetics", "Business Building", "Hands-On Workshops"]}
    />
  );
}
