import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "BlendIQ Pro Checkout",
  description: "Start a BlendIQ Pro subscription.",
  path: "/blend-iq/go-pro",
  noIndex: true,
});

export default function GoProLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

