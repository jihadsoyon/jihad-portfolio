import { Resend } from "resend";

export async function POST(request) {
  try {
    const {
      name, email, whatsapp, inquiry, inquiryLabel, packageName,
      budget, timeline, message,
    } = await request.json();

    if (!name || !email || !message || !inquiry) {
      return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const lines = [
      `Reason: ${inquiryLabel ?? inquiry}`,
      packageName && `Package: ${packageName}`,
      `Name: ${name}`,
      `Email: ${email}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      budget && `Budget: ${budget}`,
      timeline && `Timeline: ${timeline}`,
      "",
      message,
    ].filter(Boolean);

    const subject = packageName
      ? `[${packageName}] ${name}`
      : `[${inquiryLabel ?? "Contact"}] ${name}`;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text: lines.join("\n"),
    });

    if (error) {
      return Response.json({ error: "Could not send your request. Please try again." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}