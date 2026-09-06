import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Quantum Beauty Group", template: "%s | Quantum Beauty Group" },
  description: "Modern education, practical business tools, and technology built for beauty professionals.",
  applicationName: "Quantum Beauty Group",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantumbeautygroup.com"),
  openGraph: {
    type: "website",
    title: "Quantum Beauty Group",
    description: "Education in motion for beauty professionals.",
    siteName: "Quantum Beauty Group",
    images: [{ url: "/icon0.svg", width: 1200, height: 630, alt: "Quantum Beauty Group — Education in motion." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Beauty Group",
    description: "Education in motion for beauty professionals.",
    images: ["/icon0.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon1.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0">
              Skip to content
            </a>
            <Navigation />
            <div id="main-content">{children}</div>
            <Footer />
          </TooltipProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
