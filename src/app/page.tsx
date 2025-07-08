'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './_components/ContactForm';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

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
        <div
          className="relative z-10 flex flex-col items-center text-center"
          data-aos="fade-up"
        >
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
        <div
          className="md:w-1/2 flex flex-col items-center md:items-center justify-center text-center h-full"
          data-aos="fade-right"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#c83589]">
            About Iryna
          </h2>
          <p className="mb-4 text-lg">
            I&#39;ve loved nature and beauty since I was a child. I used to spend
            hours drawing horses with flowing manes and imagining elegant
            hairstyles for people. Long before I became a hairdresser, I loved
            helping my friends and family feel their best with a new look or a
            fresh style—without even realising it, I had found my calling.
            Becoming a hairdresser has allowed me to bring joy to others through
            creativity and care. I&#39;m deeply grateful to my teacher for the
            skills she passed on, her guidance, and the love she shared for this
            profession. To me, every haircut or style is like painting a
            picture—something created with heart and soul.
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
        <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
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

      <div data-aos="fade-up">
        <ContactForm />
      </div>
    </div>
  );
}
