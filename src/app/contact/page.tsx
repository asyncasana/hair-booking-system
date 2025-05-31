"use client";
import ContactForm from "../_components/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-12">
      <h1 className="text-4xl font-bold mb-8 text-[#c83589]">Contact Us</h1>
      <div className="w-full max-w-lg px-4 mb-6">
        <div className="flex flex-col items-center gap-4 mb-8">
          <a
            href="tel:+441234567890"
            className="text-lg text-[#c83589] underline hover:text-[#ff77a4] font-semibold"
          >
            📞 Call us: 01234 567890
          </a>
          <a
            href="https://wa.me/441234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-green-600 underline hover:text-green-800 font-semibold"
          >
            💬 WhatsApp: 01234 567890
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
