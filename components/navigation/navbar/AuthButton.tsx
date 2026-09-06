'use client';
import { useEffect, useMemo, useState } from "react";
import LogonButton from "./logon_button";
import ProfileButton from "./profile_button";
import createClient from "@/app/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = useMemo(() => (configured ? createClient() : null), [configured]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, [supabase]);

  return user && supabase ? <ProfileButton user={user} /> : <LogonButton />;
}
