import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Account" };

export default function UserAccountPage() {
  return <main className="qbg-section min-h-[70vh]"><div className="mx-auto max-w-3xl px-5 sm:px-8"><div className="text-center"><p className="qbg-eyebrow">Your QBG account</p><h1 className="mt-4 text-4xl font-bold">Account</h1><p className="mt-3 text-muted-foreground">Manage your active BlendIQ billing details.</p></div><Card className="mt-10"><CardHeader><span className="mb-2 flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><CreditCard /></span><CardTitle>Subscription and billing</CardTitle><CardDescription>Open the secure billing portal to update payment details, view invoices, or manage your plan.</CardDescription></CardHeader><CardContent><form method="POST" action="/api/stripe/customer-portal"><Button type="submit" size="lg">Manage subscription</Button></form></CardContent></Card></div></main>;
}
