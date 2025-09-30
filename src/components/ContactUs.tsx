"use client";

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// components
import { PHONE_NO } from "@/lib/constants";
import ReCAPTCHAField from "./ReCAPTCHAField";
import { LocateFixedIcon } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import Link from "next/link";

const ContactUs = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    const token = await recaptchaRef.current?.getValue();
    recaptchaRef.current?.reset();

    if (!token) {
      alert("Please verify reCAPTCHA");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const whatsAppIntialMessage = "Hello Maha, am from the site.";

  return (
    <div>
      <MaxWidthWrapper className="my-16">
        <div className="grid sm:grid-cols-2 items-center gap-16">
          <div>
            <SectionHead
              title="Let's Talk"
              className="mb-10 text-left"
              subtitle="Have questions or need assistance? We’re here to help you with your orders and health needs."
              subtitleClass="mx-0"
            />

            <a
              href="mailto:mail@mahadpharmaceuticals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="my-8"
            >
              <h2 className="text-lg text-green-500">Email</h2>
              <ul className="mt-3">
                <li className="flex items-center">
                  <div className="bg-neutral-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>

                  <p className="text-base ml-3">
                    mail@mahadpharmaceuticals.com
                  </p>
                </li>
              </ul>
            </a>

            <Link
              target="blank"
              className="block my-8"
              href={`https://wa.me/${PHONE_NO}?text=${whatsAppIntialMessage}`}
            >
              <h2 className="text-lg text-green-500">WhatsApp</h2>
              <ul className="mt-3">
                <li className="flex items-center">
                  <div className="bg-neutral-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>

                  <p className="text-base ml-3">
                    {formatPhoneNumber(PHONE_NO)}
                  </p>
                </li>
              </ul>
            </Link>

            <div className="my-8">
              <h2 className="text-lg text-green-500">Location</h2>
              <ul className="mt-3">
                <li className="flex items-center">
                  <div className="bg-neutral-100 h-10 w-10 rounded-md flex items-center justify-center shrink-0">
                    <LocateFixedIcon />
                  </div>
                  <p className="text-base ml-3">United Arab Emirates</p>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="form-input"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
              required
            />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              className="form-input"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              className="w-full px-4 border bg-neutral-100 outline-none focus:border-green-500 pt-2.5"
              required
            ></textarea>

            {/* reCAPTCHA */}
            <ReCAPTCHAField recaptchaRef={recaptchaRef} />

            <button
              type="submit"
              disabled={loading}
              className="border border-green-500 py-3 w-full text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ContactUs;
