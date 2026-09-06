import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sign In",
  description: "Sign in to your Quantum Beauty Group account.",
  path: "/sign-in",
  noIndex: true,
});

export default function SignInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

