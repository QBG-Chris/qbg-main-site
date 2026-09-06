import type { MetadataRoute } from "next";
import { team } from "@/components/team/team";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/beauty-schools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/apprenticeships`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/licensed-professionals`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/educators`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/class-pricing-guide`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blend-iq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blend-iq/get-beta-access`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const teamRoutes: MetadataRoute.Sitemap = team
    .filter((member) => member.bio.trim().length >= 80)
    .map((member) => ({
      url: `${SITE_URL}/about/${member.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...routes, ...teamRoutes];
}
