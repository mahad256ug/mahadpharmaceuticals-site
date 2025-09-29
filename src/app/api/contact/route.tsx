import { NextResponse } from "next/server";

import { Resend } from "resend";
import { NODE_ENV, PHONE_NO } from "@/lib/constants";
import ContactMessage from "@/emails/ContactMessage";

const resend = new Resend(process.env.RESEND_API_KEY);
const recaptchaKey = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const get = (key: string) => values[key as keyof typeof values];
    const { name, email, subject, message } = values;
    const token = get("g-recaptcha-response");

    if (!name || !email || !subject || !message || !token) {
      return NextResponse.json(
        { error: "All fields and reCAPTCHA token are required." },
        { status: 400 }
      );
    }

    // ✅ Verify reCAPTCHA with Google
    const params = new URLSearchParams();
    params.append("secret", recaptchaKey ?? "");
    params.append("response", token);

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      console.error("reCAPTCHA failed:", recaptchaData);
      return NextResponse.json(
        { error: "Invalid reCAPTCHA. Please try again." },
        { status: 400 }
      );
    }

    // sending email
    const { data, error } = await resend.emails.send({
      from: NODE_ENV === "development" ? "Acme <onboarding@resend.dev>" : "", // TODO
      to: ["maha.pharmaceutical@gmail.com"],
      subject: `Contact: ${subject}`,
      react: ContactMessage({
        name: name,
        subject: subject,
        sender_email: email,
        message: message,
        whatsappNumber: "",
        siteName: "maha pharmaceuticals",
      }),
      text: [
        `New Contact Message - ${subject}`,
        `From: ${name} <${email}>`,
        "",
        message,
        "",
        `WhatsApp: ${PHONE_NO ? `https://wa.me/${PHONE_NO}` : "not set"}`,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
