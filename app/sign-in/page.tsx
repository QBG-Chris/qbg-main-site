"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import createClient from "@/app/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState<{ text: string; success?: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabase = useMemo(() => configured ? createClient() : null, [configured]);

  function switchTab(tab: "signin" | "signup") { setActiveTab(tab); setNotice(null); setPassword(""); setConfirmPassword(""); }

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setNotice(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/account"); router.refresh();
    } catch (error) { setNotice({ text: error instanceof Error ? error.message : "Failed to sign in." }); }
    finally { setLoading(false); }
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    if (password !== confirmPassword) { setNotice({ text: "Passwords do not match." }); return; }
    if (password.length < 8) { setNotice({ text: "Use at least 8 characters for your password." }); return; }
    setNotice(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      if (error) throw error;
      setNotice({ text: "Check your email to confirm your account.", success: true });
    } catch (error) { setNotice({ text: error instanceof Error ? error.message : "Failed to create your account." }); }
    finally { setLoading(false); }
  }

  return (
    <main className="qbg-section min-h-[75vh]">
      <Card className="mx-auto max-w-xl border-primary/10 bg-card/90 shadow-xl shadow-primary/5">
        <CardHeader className="items-center text-center"><Image src="/icon0.svg" alt="" width={96} height={96} className="size-24 object-contain" /><CardTitle className="text-3xl">Welcome to QBG</CardTitle><CardDescription>{activeTab === "signin" ? "Sign in to manage your account." : "Create your Quantum Beauty Group account."}</CardDescription></CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-muted p-1"><Button type="button" variant={activeTab === "signin" ? "default" : "ghost"} onClick={() => switchTab("signin")}>Sign in</Button><Button type="button" variant={activeTab === "signup" ? "default" : "ghost"} onClick={() => switchTab("signup")}>Create account</Button></div>
          {!configured && <p role="alert" className="mb-5 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">Account access is temporarily unavailable. Please try again later.</p>}
          <form onSubmit={activeTab === "signin" ? handleSignIn : handleSignUp} className="space-y-5">
            {activeTab === "signup" && <Field id="full-name" label="Full name"><Input id="full-name" name="fullName" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required /></Field>}
            <Field id="email" label="Email"><Input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></Field>
            <Field id="password" label="Password"><Input id="password" name="password" type="password" autoComplete={activeTab === "signin" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} required /></Field>
            {activeTab === "signup" && <Field id="confirm-password" label="Confirm password"><Input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></Field>}
            {activeTab === "signin" && <div className="text-right"><Link href="/account/password-reset" className="text-sm font-medium text-primary hover:underline">Reset password</Link></div>}
            {notice && <p role="status" className={notice.success ? "rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-600" : "rounded-xl bg-destructive/10 p-3 text-sm text-destructive"}>{notice.text}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={!configured || loading}>{loading && <LoaderCircle className="animate-spin" />}{loading ? "Please wait…" : activeTab === "signin" ? "Sign in" : "Create account"}</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) { return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}</div>; }
