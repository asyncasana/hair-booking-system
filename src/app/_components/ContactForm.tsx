"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setSent(true);
          setError(false);
          formRef.current?.reset();
        },
        () => {
          setError(true);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative bg-[#e984a9] py-12 px-6 overflow-hidden"
    >
      <Image
        src="/images/contact-bg.jpg"
        alt="Contact background image of flowers"
        fill
        className="object-cover opacity-30"
        style={{ zIndex: 0 }}
        priority={false}
        draggable={false}
      />
      <div className="absolute inset-0 bg-[#e984a9]/70 z-10 pointer-events-none" />
      <div className="relative z-20 max-w-xl mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-white">Get in Touch</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="rounded bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="rounded bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="rounded bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#c83589] px-6 py-3 font-semibold text-white transition hover:bg-[#ff77a4]"
          >
            Send Message
          </button>
        </form>
        {sent && (
          <div className="mt-4 text-green-100 bg-green-700 rounded px-4 py-2">
            Thank you! Your message has been sent.
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-100 text-center bg-red-700 rounded px-4 py-2">
            Oops! Something went wrong. Please try again or reach out by clicking on the WhatsApp icon in the footer.
          </div>
        )}
      </div>
    </section>
  );
}
