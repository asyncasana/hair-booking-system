"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const SERVICES = [
  { id: "haircut", name: "Haircut", price: "20" },
  { id: "color", name: "Hair Coloring", price: "20" },
  { id: "styling", name: "Styling", price: "20" },
  { id: "highlights", name: "Highlights", price: "20" },
];

export default function BookPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get pre-selected values from URL
  const preselectedService = searchParams.get("service") || "";
  const preselectedOption = searchParams.get("option") || "";
  const preselectedPrice = searchParams.get("price") || "";

  // Use state for selection, fallback to preselected values
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedOption, setSelectedOption] = useState(preselectedOption);
  const [selectedPrice, setSelectedPrice] = useState(preselectedPrice);

  // Placeholder for selected date/time
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // If not logged in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-[#c83589]">
          Book an Appointment
        </h2>
        <p className="mb-4">Please log in to book an appointment.</p>
        <button
          className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // Show selected service if preselected, otherwise show dropdown
  return (
    <div className="max-w-lg mx-auto pt-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#c83589] text-center">
        Book an Appointment
      </h1>

      {/* Service selection */}
      {selectedService ? (
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Selected service:
          </label>
          <div className="flex items-center gap-4">
            <span className="text-[#c83589] font-semibold">
              {SERVICES.find((s) => s.id === selectedService)?.name ||
                selectedService}
            </span>
            <button
              className="text-xs underline text-gray-500 hover:text-[#c83589] transition"
              onClick={() => {
                setSelectedService("");
                setSelectedOption("");
                setSelectedPrice("");
                router.replace("/book");
              }}
              type="button"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Select a service:
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">-- Choose a service --</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Option and price display */}
      {selectedOption && (
        <div className="mb-4">
          <div className="font-semibold text-gray-700">Option:</div>
          <div className="text-[#c83589]">{selectedOption}</div>
        </div>
      )}
      {selectedPrice && (
        <div className="mb-4">
          <div className="font-semibold text-gray-700">Price:</div>
          <div className="text-[#c83589]">{selectedPrice}</div>
        </div>
      )}

      {/* Calendar placeholder */}
      {selectedService && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Choose a date and time:
          </label>
          <div className="border rounded px-3 py-8 text-center text-gray-400">
            {/* Replace this with a real calendar/slots component */}
            [Calendar with available slots goes here]
          </div>
        </div>
      )}

      {/* Confirm button placeholder */}
      {selectedService && selectedDate && (
        <button className="w-full bg-[#c83589] text-white rounded py-2 font-semibold hover:bg-[#ff77a4] transition">
          Confirm Booking
        </button>
      )}
    </div>
  );
}
