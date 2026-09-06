import ContactForm from "@/components/team/contact_form";

export const metadata = { title: "Contact", description: "Contact Quantum Beauty Group about classes, BlendIQ, or partnerships." };

export default function ContactPage() {
  return (
    <main className="qbg-section min-h-[70vh]">
      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center"><p className="qbg-eyebrow">Start a conversation</p><h1 className="mt-4 text-5xl font-bold tracking-tight">Contact us</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Questions about a class, BlendIQ, or a collaboration? Tell us what you’re thinking and we’ll get back to you soon.</p></div>
        <ContactForm />
      </section>
    </main>
  );
}
