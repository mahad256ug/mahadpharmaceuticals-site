import { Resend } from "resend";

import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY!);
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

    // ✅ Send email with Resend
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "maha.pharmaceutical@gmail.com",
      subject,
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
