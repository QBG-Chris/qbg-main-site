import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
    const { name, email, subject, message } = body as Record<string, unknown>;
    const fields = { name: String(name ?? "").trim(), email: String(email ?? "").trim(), subject: String(subject ?? "").trim(), message: String(message ?? "").trim() };
    if (!fields.name || !fields.subject || !fields.message || !/^\S+@\S+\.\S+$/.test(fields.email)) return Response.json({ error: "Please complete every field with a valid email address." }, { status: 400 });
    if (fields.name.length > 120 || fields.email.length > 254 || fields.subject.length > 160 || fields.message.length > 5000) return Response.json({ error: "One or more fields is too long." }, { status: 400 });
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
      console.error("Contact form email configuration is incomplete.");
      return Response.json({ error: "Messaging is temporarily unavailable. Please email support@quantumbeautygroup.com." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT), secure: Number(process.env.SMTP_PORT) === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });

    await transporter.sendMail({ from: process.env.CONTACT_FROM_EMAIL, to: process.env.CONTACT_TO_EMAIL, subject: `Contact Form: ${fields.subject}`, text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`, replyTo: fields.email });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "We couldn’t send your message. Please try again." }, { status: 500 });
  }
}
