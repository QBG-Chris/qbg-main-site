"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import createClient from "@/app/supabase/client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ProfileButton({ user }: { user: User }) {
  const displayName = String(user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Account");
  const initials = displayName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline" className="gap-2 rounded-full pl-1.5"><span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">{initials}</span><span className="hidden max-w-28 truncate md:inline">{displayName.split(" ")[0]}</span></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild><Link href="/account">Account</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void createClient().auth.signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
