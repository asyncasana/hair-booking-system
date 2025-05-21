import Image from "next/image";

export default function ContactForm() {
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
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="rounded bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="rounded bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
            required
          />
          <textarea
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
      </div>
    </section>
  );
}