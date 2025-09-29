// emails/ContactMessage.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

type ContactMessageProps = {
  name: string;
  subject: string;
  sender_email: string;
  message: string;
  whatsappNumber?: string; // like "256774123456"
  siteName?: string; // optional branding
};

const green = "#22c55e"; // Tailwind green-500
const grayBg = "#f6f7f9";
const textGray = "#111827"; // gray-900
const subText = "#4b5563"; // gray-600
const border = "#e5e7eb"; // gray-200

export default function ContactMessage({
  name,
  subject,
  sender_email,
  message,
  whatsappNumber,
  siteName = "Contact Form",
}: ContactMessageProps) {
  const waNumber = (whatsappNumber || "").replace(/\D/g, "");
  const waText = encodeURIComponent(
    `Hi, I just submitted the contact form.\nName: ${name}\nEmail: ${sender_email}\nSubject: ${subject}`
  );
  const waHref =
    waNumber?.length > 5
      ? `https://wa.me/${waNumber}?text=${waText}`
      : undefined;

  const previewText = `${siteName}: New message from ${name} — ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: grayBg,
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji"',
          color: textGray,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            width: "100%",
            margin: "0 auto",
            padding: "24px 16px",
          }}
        >
          <Section
            style={{
              background: "#ffffff",
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${border}`,
              boxShadow:
                "0 2px 6px rgba(16,24,40,0.04), 0 1px 2px rgba(16,24,40,0.06)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${green}, #16a34a)`,
                padding: "20px 24px",
              }}
            >
              <Heading
                as="h2"
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                }}
              >
                New Contact Message
              </Heading>
              <Text
                style={{ margin: "6px 0 0", color: "#dcfce7", fontSize: 13 }}
              >
                {siteName}
              </Text>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 24px" }}>
              <Text style={{ margin: 0, fontSize: 14, color: subText }}>
                You’ve received a new message via your website contact form.
              </Text>

              <Section style={{ marginTop: 16 }}>
                <Heading as="h3" style={{ margin: 0, fontSize: 16 }}>
                  Details
                </Heading>
                <Hr style={{ borderColor: border, margin: "10px 0 16px" }} />

                <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
                  <strong style={{ color: subText }}>From:</strong>{" "}
                  <Link
                    href={`mailto:${sender_email}`}
                    style={{ color: green, textDecoration: "none" }}
                  >
                    {sender_email}
                  </Link>
                </Text>

                <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
                  <strong style={{ color: subText }}>Name:</strong> {name}
                </Text>

                <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
                  <strong style={{ color: subText }}>Subject:</strong> {subject}
                </Text>

                <Text
                  style={{
                    marginTop: 12,
                    background: grayBg,
                    border: `1px solid ${border}`,
                    borderRadius: 10,
                    padding: 12,
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.5,
                    fontSize: 14,
                  }}
                >
                  {message}
                </Text>
              </Section>

              <Section style={{ marginTop: 16 }}>
                <Hr style={{ borderColor: border, margin: "4px 0 16px" }} />
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link
                    href={`mailto:${sender_email}?subject=Re:%20${encodeURIComponent(
                      subject
                    )}`}
                    style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: `1px solid ${green}`,
                      color: "#ffffff",
                      background: green,
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Reply via Email
                  </Link>

                  {waHref && (
                    <Link
                      href={waHref}
                      style={{
                        display: "inline-block",
                        padding: "10px 14px",
                        borderRadius: 999,
                        border: `1px solid ${border}`,
                        color: green,
                        background: "#ffffff",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      WhatsApp me
                    </Link>
                  )}
                </div>
              </Section>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px 24px",
                borderTop: `1px solid ${border}`,
                background: "#fafafa",
              }}
            >
              <Text style={{ margin: 0, fontSize: 12, color: subText }}>
                This email was generated automatically from your website contact
                form. If this wasn’t you, you can ignore it.
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
