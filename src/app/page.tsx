import Link from "next/link";
import Image from "next/image";
import ContactForm from "./_components/ContactForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] items-center justify-center">
        <Image
          src="/images/hero-image.jpg"
          alt="Hero background image of flowers"
          fill
          className="object-cover brightness-60 opacity-80"
          draggable={false}
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
            href="/services"
            className="rounded-full bg-[#c83589] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#ff77a4]"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-6 py-16">
        <div className="md:w-1/2 flex flex-col items-center md:items-center justify-center text-center h-full">
          <h2 className="mb-4 text-3xl font-bold text-[#c83589]">
            About Iryna
          </h2>
          <p className="mb-4 text-lg">
            With over 10 years of experience, Iryna brings creativity and care
            to every client. Specialising in modern cuts, color, and styling,
            she is passionate about helping you look and feel your best.
          </p>
          <p className="mb-4 text-md text-[#c83589]">
            “Your hair is your crown—let me make it shine!”
          </p>
          <Link
            href="/services"
            className="mt-4 flex rounded-full bg-[#c83589] px-6 py-3 font-semibold text-white transition hover:bg-[#ff77a4]"
          >
            Book Online
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/about-iryna.jpg"
            alt="Iryna the hair stylist with a flower background"
            width={320}
            height={320}
            className="rounded-2xl shadow-lg object-cover"
            draggable={false}
          />
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
