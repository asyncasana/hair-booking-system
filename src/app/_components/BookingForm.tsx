"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import BookingCalendar from "@/app/_components/BookingCalendar";
import ContactForm from "./ContactForm";
import AuthModal from "@/app/_components/AuthModal";
import "react-calendar/dist/Calendar.css";
import { parseTimeString } from "@/lib/utils/time";

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [services, setServices] = useState<any[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch services from your API route
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices);
  }, []);

  const preselectedService = searchParams.get("service") || "";
  const preselectedOption = searchParams.get("option") || "";
  const preselectedPrice = searchParams.get("price") || "";

  const [selectedService, setSelectedService] = useState(preselectedService);
  const [selectedOption, setSelectedOption] = useState(preselectedOption);
  const [selectedPrice, setSelectedPrice] = useState(preselectedPrice);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const parsed = parseTimeString(selectedTime);
  if (selectedDate && parsed) {
    const date = new Date(selectedDate);
    date.setHours(parsed.hours, parsed.minutes, 0, 0);
    // ... use date as startTime
  }

  // Handler for booking submission
  const handleConfirmBooking = async () => {
    setLoading(true); // Start loading
    let startTime: Date | null = null;
    if (selectedDate && selectedTime) {
      // Try 12-hour format first
      const timeParts = selectedTime.split(" ");
      if (timeParts.length === 2) {
        const [time, modifier] = timeParts;
        if (time) {
          const [hoursStr, minutesStr] = time.split(":");
          let hours = Number(hoursStr);
          let minutes = Number(minutesStr);
          if (!isNaN(hours) && !isNaN(minutes)) {
            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
            const date = new Date(selectedDate);
            date.setHours(hours, minutes, 0, 0);
            startTime = date;
          }
        }
      } else if (selectedTime.includes(":")) {
        // 24-hour format fallback
        const [hoursStr, minutesStr] = selectedTime.split(":");
        let hours = Number(hoursStr);
        let minutes = Number(minutesStr);
        if (!isNaN(hours) && !isNaN(minutes)) {
          const date = new Date(selectedDate);
          date.setHours(hours, minutes, 0, 0);
          startTime = date;
        }
      }
    }

    // Validate startTime
    if (!startTime || isNaN(startTime.getTime())) {
      setShowError(true);
      setLoading(false);
      alert("Invalid date or time selected.");
      return;
    }

    const bookingData = {
      service: selectedService,
      startTime: startTime.toISOString(),
      customerName: session?.user?.name || "Guest",
      customerEmail: session?.user?.email || null,
    };

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      setShowConfirmation(true);
    } catch (error) {
      setShowError(true);
    }
    setLoading(false); // Stop loading
    // ...existing code...
  };

  // If not logged in
  if (!session) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-[#c83589]">
            Book an Appointment
          </h2>
          <p className="mb-4">Please log in to book an appointment.</p>
          <button
            className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
            onClick={() => setShowAuthModal(true)}
          >
            Login / Register
          </button>
        </div>
        {showAuthModal && (
          <AuthModal
            open={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-[#c83589] mb-2"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span className="text-[#c83589] font-semibold">
              Processing your booking...
            </span>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto pt-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#c83589] text-center">
          Book an Appointment
        </h1>

        {/* Service selection */}
        {!selectedService && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Select a service:
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setSelectedOption("");
                setSelectedPrice("");
              }}
            >
              <option value="">-- Choose a service --</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} -- £{service.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Show option and price summary after option is picked */}
        {selectedService && (
          <div className="mb-4 flex flex-col items-center text-center">
            <div>
              <div className="font-semibold text-gray-700">Service:</div>
              <div className="mb-2 text-[#c83589] text-lg font-semibold">
                {
                  services.find((s) => String(s.id) === String(selectedService))
                    ?.name
                }
              </div>
              <div className="font-semibold text-gray-700">Price:</div>
              <div className="mb-2 text-[#c83589]">
                £
                {
                  services.find((s) => String(s.id) === String(selectedService))
                    ?.price
                }
              </div>
            </div>
            <button
              className="mt-2 mb-4 text-s underline text-gray-500 hover:text-[#c83589] transition"
              onClick={() => {
                setSelectedService("");
                setSelectedOption("");
                setSelectedPrice("");
                router.replace("/book");
              }}
              type="button"
            >
              Edit
            </button>
          </div>
        )}

        {/* Calendar */}
        {selectedService && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Choose a date:
            </label>
            <BookingCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            {selectedDate && (
              <div className="mt-4 text-[#c83589] font-semibold">
                Selected date:{" "}
                {selectedDate instanceof Date
                  ? selectedDate.toLocaleDateString()
                  : String(selectedDate)}
                {selectedTime && (
                  <div className="mb-2 text-[#c83589]">
                    Time: {selectedTime}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Confirm button */}
        {selectedService && selectedDate && (
          <button
            className="mb-6 w-full bg-[#c83589] text-white rounded py-2 font-semibold hover:bg-[#ff77a4] transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading || !selectedTime}
            onClick={handleConfirmBooking}
            type="button"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-[#ff77a4] bg-opacity-40 z-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-[#c83589]">
                Booking Confirmed!
              </h2>
              <p className="mb-4">Your appointment has been booked.</p>
              <button
                className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
                onClick={() => {
                  setShowConfirmation(false);
                  router.push("/account/bookings");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-25 w-full !max-w-none px-0">
        <ContactForm />
      </div>
    </>
  );
}
