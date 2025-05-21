"use client";

import ContactForm from "@/app/_components/ContactForm";

export default function TermsPage() {
  return (
    <div className="mx-auto pt-12">
      <div className="max-w-2xl mx-auto pt-12 px-4">
        <h1 className="text-3xl font-bold text-[#c83589] mb-6">
          Terms &amp; Conditions – Hair with Iryna
        </h1>
        <p className="mb-2 text-sm text-gray-500">
          Effective Date: 1 April 2025
        </p>
        <h2 className="font-semibold mt-6 mb-2">1. Appointments</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Please arrive on time to avoid delays.</li>
          <li>
            If you are running late, we may have to shorten your treatment or
            reschedule.
          </li>
          <li>
            We reserve the right to refuse service if needed (e.g. due to
            inappropriate behaviour or hygiene concerns).
          </li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">
          2. Cancellations &amp; No-Shows
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Please give at least 24 hours' notice if you need to cancel or
            change your appointment.
          </li>
          <li>
            Late cancellations (under 24 hours) or missed appointments may
            result in a charge.
          </li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">3. Payments</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Payments can be made in person via cash or card.</li>
          <li>Online payment options will be available soon.</li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">4. Refunds</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Services are non-refundable once provided, but we want you to be
            happy. If there is an issue, please let us know within 48 hours so
            we can make it right.
          </li>
        </ul>
        <h2 className="font-semibold mt-6 mb-2">5. Changes to Services</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            We reserve the right to update prices, services, or these terms at
            any time. The latest version will always be available on the
            website.
          </li>
        </ul>
      </div>
      <div className="mt-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
