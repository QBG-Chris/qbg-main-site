"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import AuthButton from "./navbar/AuthButton";
import { ModeToggle } from "./navbar/theme_selector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blend-iq", label: "BlendIQ" },
  { href: "/services", label: "Our Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="qbg-container flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label="Quantum Beauty Group home" className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Image src="/icon0.svg" alt="" width={52} height={52} className="size-12 object-contain dark:hidden" priority />
          <Image src="/QBG_Logo_White.png" alt="" width={52} height={52} className="hidden size-12 object-contain dark:block" priority />
          <span className="hidden text-sm font-bold leading-tight tracking-tight sm:block">Quantum Beauty<br /><span className="text-primary">Group</span></span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <Button key={link.href} asChild variant="ghost" className={cn("rounded-full px-4", active && "bg-secondary text-secondary-foreground")}><Link href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link></Button>;
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden sm:block"><AuthButton /></div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-5 py-5 shadow-xl lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return <Button key={link.href} asChild variant={active ? "secondary" : "ghost"} className="h-12 justify-start text-base"><Link href={link.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}>{link.label}</Link></Button>;
            })}
            <div className="mt-3 border-t border-border pt-4 sm:hidden"><AuthButton /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
