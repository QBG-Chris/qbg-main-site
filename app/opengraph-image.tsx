import { ImageResponse } from "next/og";
import SocialCard from "@/components/seo/social-card";
import { getQbgLogoDataUri } from "@/lib/qbg-logo";

export const alt = "Quantum Beauty Group — Education in motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const logoSrc = await getQbgLogoDataUri();
  return new ImageResponse(<SocialCard logoSrc={logoSrc} />, size);
}
