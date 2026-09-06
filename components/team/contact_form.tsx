"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(["name", "email", "subject", "message"].map((key) => [key, String(formData.get(key) ?? "")]))),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? "We couldn’t send your message.");
      form.reset();
      setStatus("success");
      setMessage("Thanks—your message is on its way. We’ll be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <Card className="mt-10 border-primary/10 bg-card/90 py-0 shadow-xl shadow-primary/5">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="contact-name">Name</Label><Input id="contact-name" name="name" autoComplete="name" required /></div>
            <div className="space-y-2"><Label htmlFor="contact-email">Email</Label><Input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="contact-subject">Subject</Label><Input id="contact-subject" name="subject" required /></div>
          <div className="space-y-2"><Label htmlFor="contact-message">Message</Label><Textarea id="contact-message" name="message" rows={6} required /></div>
          <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? <LoaderCircle className="animate-spin" /> : <Send />}{status === "sending" ? "Sending…" : "Send message"}</Button>
          {message && <p role="status" aria-live="polite" className={status === "success" ? "text-sm text-emerald-600 dark:text-emerald-400" : "text-sm text-destructive"}>{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
