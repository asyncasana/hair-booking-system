'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactForm from '../_components/ContactForm';

export default function ContactPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white pt-12 px-4">
      <h1
        className="text-4xl font-bold mb-4 text-center text-[#c83589]"
        data-aos="fade-down"
      >
        Get In Touch
      </h1>

      <p
        className="max-w-xl mx-auto mb-8 text-center text-gray-700 text-lg"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        We love to hear from you — whether you have a question, want to book
        an appointment, or just want to say hi. Fill out the form below and we will
        get back to you as soon as we can.
      </p>

      <div
        className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <ContactForm />
      </div>

      <div className="h-16" />
    </div>
  );
}
