import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-[]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#c83589] backdrop-blur-md text-white shadow-md">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <span className="text-2xl font-bold tracking-widest text-white">
            Hair with Iryna
          </span>
        </div>
        <nav className="flex items-center gap-8">
          <Link href="/services" className="hover:text-pink-300 transition">
            Services
          </Link>
          <Link href="/booking" className="hover:text-pink-300 transition">
            Book Online
          </Link>
          <Link href="#contact" className="hover:text-pink-300 transition">
            Contact Us
          </Link>
          <Link
            href="/account"
            className="ml-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
            title="Account"
          >
            <svg
              width={28}
              height={28}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={14} cy={10} r={4} />
              <path d="M4 22c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex h-[60vh] items-center justify-center">
        <Image
          src="/images/hero-image.jpg"
          alt="Hero background image of flowers"
          fill
          className="object-cover brightness-60 opacity-80"
          priority
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="mb-4 text-5xl font-extrabold text-white">
            Beautiful Hair, Personal Touch
          </h1>
          <p className="mb-8 text-xl font-normal drop-shadow text-white">
            Book your next appointment with Iryna and feel your best.
          </p>
          <Link
            href="/booking"
            className="rounded-full bg-[#c83589] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#ff77a4]"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-6 py-16">
        <div className="md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-[#c83589]">
            About Iryna
          </h2>
          <p className="mb-4 text-lg">
            With over 10 years of experience, Iryna brings creativity and care
            to every client. Specializing in modern cuts, color, and styling,
            she’s passionate about helping you look and feel your best.
          </p>
          <p className="mb-4 text-md text-[#c83589]">
            “Your hair is your crown—let me make it shine!”
          </p>
          <button className="mt-4 rounded-full bg-[#c83589] px-6 py-3 font-semibold text-white transition hover:bg-[#ff77a4]">
            See All Services
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/about-iryna.jpg"
            alt="Iryna the hair stylist with a flower background"
            width={320}
            height={320}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative bg-[#e984a9] py-12 px-6 overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="/images/contact-bg.jpg" // Place your image in /public/images/
          alt="Contact background image of flowers"
          fill
          className="object-cover opacity-30"
          style={{ zIndex: 0 }}
          priority={false}
        />
        {/* Overlay for better contrast */}
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

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6 bg-[#c83589] text-sm text-white">
        <div>&copy; {currentYear} Hair with Iryna</div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-pink-300 transition">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-pink-300 transition">
            Privacy Policy
          </Link>
        </div>
        <div className="flex gap-4">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition"
          >
            <svg
              width={22}
              height={22}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="2" width="18" height="18" rx="5" />
              <circle cx="11" cy="11" r="4" />
              <circle cx="17" cy="7" r="1.5" />
            </svg>
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition"
          >
            <svg
              width={22}
              height={22}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="2" width="18" height="18" rx="5" />
              <path d="M14 8h-2a2 2 0 0 0-2 2v2h2v4h2v-4h2v-2h-2V10a1 1 0 0 1 1-1h1V8z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
