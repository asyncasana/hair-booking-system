"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BookingCalendar from "@/app/_components/BookingCalendar";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;

  const [showModal, setShowModal] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [serviceName, setServiceName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // <-- NEW
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await fetch(`/api/bookings/${bookingId}`);
      const data = await res.json();

      // Only set date/time if booking has a startTime
      if (data.booking.startTime) {
        const dateObj = new Date(data.booking.startTime);
        setSelectedDate(dateObj);
        setSelectedTime(
          dateObj.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      }

      setBooking(data.booking);
      setServiceName(data.booking.service?.name || "");
      setStartTime(data.booking.startTime || "");
      setDuration(data.booking.service?.duration);
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    // Validate selectedTime format (should be "HH:MM" or "HH:MM AM/PM")
    const timeParts = selectedTime.split(":");
    if (timeParts.length < 2) {
      alert("Please select a valid time.");
      return;
    }
    const [hoursStr, minutesStr] = timeParts;
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
      alert("Please select a valid time.");
      return;
    }

    const date = new Date(selectedDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    setSubmitting(true); // <-- Show loader

    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        startTime: date.toISOString(),
        endTime: duration ? new Date(date.getTime() + duration * 60000).toISOString() : null,
      }),
    });

    router.push("/account/bookings");
  };

  if (loading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found.</div>;

  return (
    <div className="max-w-lg mx-auto pt-12 px-4">
      {/* Loader overlay when submitting */}
      {submitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-[#c83589] mb-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="text-[#c83589] font-semibold">Saving changes...</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-[#c83589]">Edit Booking</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-semibold mb-1">Service</label>
          <p>{serviceName}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Date & Time</label>
          <BookingCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#c83589] text-white rounded font-semibold hover:bg-[#ff77a4] transition"
          disabled={submitting}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => router.push("/account/bookings")}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded font-semibold hover:bg-gray-300 transition"
          disabled={submitting}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}