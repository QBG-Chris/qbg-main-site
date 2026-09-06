"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Check, LoaderCircle } from "lucide-react";
import createClient from "@/app/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = ["Client vault", "Appointment book", "Finance tracker", "Backbar Butler", "Online booking", "Level calculator", "Formula selector", "Unlimited storage", "Unlimited SMS notifications"];

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleCheckout() {
    if (!user) { window.location.href = "/sign-in"; return; }
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lookupKey: "pro_monthly" }) });
      const data: { error?: string; url?: string } = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error ?? "Unable to begin checkout.");
      window.location.href = data.url;
    } catch (error) { window.alert(error instanceof Error ? error.message : "Unable to begin checkout."); setLoading(false); }
  }

  return (
    <main className="qbg-section min-h-[75vh]"><Card className="mx-auto max-w-2xl border-primary/20 shadow-2xl shadow-primary/10"><CardHeader className="items-center text-center"><Image src="https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/logos/logo.png" alt="BlendIQ" width={84} height={84} className="size-20 object-contain" /><Badge>Pro</Badge><CardTitle className="text-4xl">Everything you need. Nothing you don’t.</CardTitle><p className="mt-3 text-3xl font-bold">$14.99 <span className="text-base font-normal text-muted-foreground">/ month</span></p></CardHeader><CardContent><ul className="grid gap-3 sm:grid-cols-2">{features.map((feature) => <li key={feature} className="flex items-center gap-3 rounded-xl bg-muted p-3 text-sm"><Check className="size-4 text-primary" />{feature}</li>)}</ul><Button size="lg" className="mt-8 w-full" disabled={loading || !configured} onClick={handleCheckout}>{loading && <LoaderCircle className="animate-spin" />}{loading ? "Opening checkout…" : user ? "Go Pro" : "Sign in to subscribe"}</Button></CardContent></Card></main>
  );
}
