"use client";

import ContactForm from "../_components/ContactForm";

export default function PrivacyPage() {
  return (
    <div className="mx-auto pt-12">
      <div className="max-w-2xl mx-auto pt-12 px-4">
        <h1 className="text-3xl font-bold text-[#c83589] mb-6">
          Privacy Policy – Hair with Iryna
        </h1>
        <p className="mb-2 text-sm text-gray-500">
          Effective Date: 1 April 2025
        </p>
        <p className="mb-4">
          Hair with Iryna ("we", "us", or "our") respects your privacy and is
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and store your data when you use our
          website and booking system.
        </p>
        <h2 className="font-semibold mt-6 mb-2">1. What we collect:</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Your name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Appointment details</li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">2. Why we collect it:</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Confirm and manage your bookings</li>
          <li>Contact you about your appointments</li>
          <li>Improve our service</li>
          <li>(If you have opted in) send you updates or offers</li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">3. How we keep it safe:</h2>
        <p className="mb-4">
          Your personal data is stored securely and only accessible to those who
          need it. We never sell or share your info for marketing.
        </p>
        <h2 className="font-semibold mt-6 mb-2">4. Third-party tools:</h2>
        <p className="mb-4">
          We may use third-party systems (e.g. booking or payment platforms) to
          manage appointments and payments. These services are GDPR-compliant
          and have their own privacy policies.
        </p>
        <h2 className="font-semibold mt-6 mb-2">5. Your rights:</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Request a copy of your data</li>
          <li>Ask us to update or delete it</li>
          <li>Opt out of marketing at any time</li>
        </ul>
        <p>
          To contact us about your data, email:{" "}
          <span className="underline">irina.boyeva64@gmail.com</span>
        </p>
      </div>
      <div className="mt-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
