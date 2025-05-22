"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { SERVICES } from "@/app/_data/services";
import Calendar from "react-calendar";
import BookingCalendar from "@/app/_components/BookingCalendar";
import ContactForm from "./ContactForm";
import "react-calendar/dist/Calendar.css";


export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

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

  // Handler for booking submission
  const handleConfirmBooking = async () => {
    // Prepare booking data
    const bookingData = {
      service: selectedService,
      option: selectedOption,
      price: selectedPrice,
      date: selectedDate,
      time: selectedTime,
      user: session?.user?.email, // or whatever user info you want
    };
    try {
      // TODO: Send bookingData to your API/database here
      // await fetch("/api/bookings", { method: "POST", body: JSON.stringify(bookingData) });

      // For now, just log it and show confirmation
      console.log("Booking submitted:", bookingData);
      setShowConfirmation(true);
    } catch (error) {
      setShowError(true);
    }
  };

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
    <>
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
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Option selection (only if service is selected and option is not) */}
      {selectedService &&
        !selectedOption &&
        SERVICES.find((s) => s.id === selectedService)?.breakdown && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Select an option:
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                // Set price automatically when option is selected
                const service = SERVICES.find((s) => s.id === selectedService);
                const option = service?.breakdown.find(
                  (o) => o.label === e.target.value
                );
                setSelectedPrice(option?.price || "");
              }}
            >
              <option value="">-- Choose an option --</option>
              {SERVICES.find((s) => s.id === selectedService)?.breakdown.map(
                (option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>
        )}

      {/* Show option and price summary after option is picked */}
      {selectedService && (
        <div className="mb-4 flex flex-col items-center text-center">
          <div>
            <div className="font-semibold text-gray-700">Service:</div>
            <div className="mb-2 text-[#c83589] text-lg font-semibold">
              {SERVICES.find((s) => s.id === selectedService)?.title}
            </div>
            {selectedOption && (
              <>
                <div className="font-semibold text-gray-700">Option:</div>
                <div className="mb-2 text-[#c83589]">{selectedOption}</div>
              </>
            )}
            {selectedOption && (
              <>
                <div className="font-semibold text-gray-700">Price:</div>
                <div className="mb-2 text-[#c83589]">{selectedPrice}</div>
              </>
            )}
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
                <div className="mb-2 text-[#c83589]">Time: {selectedTime}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confirm button */}
      {selectedService && selectedDate && (
        <button
          className="mb-6 w-full bg-[#c83589] text-white rounded py-2 font-semibold hover:bg-[#ff77a4] transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={loading || !selectedTime}
          onClick={handleConfirmBooking}
          type="button"
        >
          {loading ? "Booking..." : "Confirm Booking"}
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
                router.push("/account");
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
