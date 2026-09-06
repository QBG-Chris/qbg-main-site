import type { Metadata } from "next";

export const SITE_NAME = "Quantum Beauty Group";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantumbeautygroup.com"
).replace(/\/$/, "");
export const DEFAULT_DESCRIPTION =
  "Modern beauty education, professional development, and practical salon technology for beauty professionals, educators, schools, and apprentices.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: `${SITE_NAME} | ${title}` } : title,
    description,
    alternates: noIndex ? undefined : { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Quantum Beauty Group — Education in motion",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/twitter-image"],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}
