"use client";

import { useState } from "react";
import { Check, LoaderCircle, MapPin, MonitorPlay } from "lucide-react";
import US_STATES from "@/utils/us_states";
import CLASS_SUBJECTS from "@/utils/class_subjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BookingType = "virtual" | "inPerson";
type Status = "idle" | "sending" | "success" | "error";
const selectClass = "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none focus:border-ring focus:ring-3 focus:ring-ring/20";

export default function BookAClassSelector() {
  const [bookingType, setBookingType] = useState<BookingType>("virtual");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const line = (label: string, key: string) => `${label}: ${String(data.get(key) ?? "")}`;
    const details = [line("Primary subject", "primaryClassSubject"), line("Attendees", "numberOfAttendees"), line("Role", "role"), line("Venue", "venueName")];
    if (bookingType === "inPerson") details.push(line("Venue type", "venueType"), `Address: ${String(data.get("address") ?? "")}, ${String(data.get("city") ?? "")}, ${String(data.get("state") ?? "")} ${String(data.get("zipCode") ?? "")}`);

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), subject: `Class request: ${bookingType === "virtual" ? "Virtual" : "In person"}`, message: details.join("\n") }) });
      const result: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "We couldn’t send your request.");
      form.reset();
      setStatus("success");
      setMessage("Your request is in! Our education team will follow up to shape the details.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="mx-auto mb-6 grid max-w-md grid-cols-2 rounded-xl bg-muted p-1" role="group" aria-label="Class format">
        <Button type="button" variant={bookingType === "virtual" ? "default" : "ghost"} onClick={() => setBookingType("virtual")} aria-pressed={bookingType === "virtual"}><MonitorPlay />Virtual</Button>
        <Button type="button" variant={bookingType === "inPerson" ? "default" : "ghost"} onClick={() => setBookingType("inPerson")} aria-pressed={bookingType === "inPerson"}><MapPin />In person</Button>
      </div>
      <Card className="border-primary/10 bg-card/90 py-0 text-left shadow-xl shadow-primary/5">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="booking-name" label="Name"><Input id="booking-name" name="name" autoComplete="name" required /></Field>
              <Field id="booking-email" label="Email"><Input id="booking-email" name="email" type="email" autoComplete="email" required /></Field>
              <Field id="booking-attendees" label="Number of attendees"><Input id="booking-attendees" name="numberOfAttendees" type="number" min={1} placeholder="12" required /></Field>
              <Field id="booking-role" label="Your role"><Input id="booking-role" name="role" placeholder="Owner, director, stylist…" required /></Field>
            </div>
            <Field id="booking-subject" label="Primary class subject"><select id="booking-subject" name="primaryClassSubject" required className={selectClass}><option value="">Choose a subject</option>{CLASS_SUBJECTS.map((subject) => <option key={subject.value} value={subject.value}>{subject.label}</option>)}</select></Field>
            <div className="grid gap-6 sm:grid-cols-2">
              {bookingType === "inPerson" && <Field id="booking-venue-type" label="Venue type"><Input id="booking-venue-type" name="venueType" placeholder="School, salon, or other" required /></Field>}
              <Field id="booking-venue" label={bookingType === "virtual" ? "School or salon name" : "Venue name"}><Input id="booking-venue" name="venueName" required /></Field>
            </div>
            {bookingType === "inPerson" && <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2"><Field id="booking-address" label="Street address"><Input id="booking-address" name="address" autoComplete="street-address" required /></Field><Field id="booking-city" label="City"><Input id="booking-city" name="city" autoComplete="address-level2" required /></Field><Field id="booking-state" label="State"><select id="booking-state" name="state" autoComplete="address-level1" required className={selectClass}><option value="">Choose a state</option>{US_STATES.map((state) => <option key={state.value} value={state.value}>{state.label}</option>)}</select></Field><Field id="booking-zip" label="ZIP code"><Input id="booking-zip" name="zipCode" inputMode="numeric" autoComplete="postal-code" maxLength={10} required /></Field></div>}
            <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? <LoaderCircle className="animate-spin" /> : <Check />}{status === "sending" ? "Sending…" : "Submit request"}</Button>
            {message && <p role="status" aria-live="polite" className={status === "success" ? "text-sm text-emerald-600 dark:text-emerald-400" : "text-sm text-destructive"}>{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}</div>;
}
