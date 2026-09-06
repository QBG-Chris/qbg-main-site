import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const explore = [["About", "/about"], ["BlendIQ", "/blend-iq"], ["Our Services", "/services"], ["Contact", "/contact"]] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/70">
      <div className="qbg-container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-3"><Image src="/icon0.svg" alt="" width={48} height={48} className="size-12 object-contain" /><span className="font-bold">Quantum Beauty Group</span></Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Education in motion—practical learning and thoughtful technology for beauty professionals who want to work smarter.</p>
          <div className="mt-5 flex gap-2"><Button asChild variant="outline" size="icon"><a href="mailto:support@quantumbeautygroup.com" aria-label="Email Quantum Beauty Group"><Mail /></a></Button><Button asChild variant="outline" size="icon"><a href="https://www.instagram.com/quantumbeautygroup" target="_blank" rel="noreferrer" aria-label="Quantum Beauty Group on Instagram"><Instagram /></a></Button></div>
        </div>
        <div><h2 className="text-sm font-bold uppercase tracking-[0.18em]">Explore</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{explore.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-primary">{label}</Link></li>)}</ul></div>
        <div><h2 className="text-sm font-bold uppercase tracking-[0.18em]">Legal</h2><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li><Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy Policy</Link></li></ul></div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Quantum Beauty Group. All rights reserved.</div>
    </footer>
  );
}
