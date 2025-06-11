"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Booking = {
  id: string;
  serviceName: string;
  duration?: number;
  startTime: string;
  status: string;
};

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const timeZone = "Europe/London";
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentFormatted, setCurrentFormatted] = useState<any[]>([]);
  const [pastFormatted, setPastFormatted] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [bookingsLoading, setBookingsLoading] = useState(true); // NEW

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const now = new Date();
    const nowZoned = toZonedTime(now, timeZone);

    const current = bookings
      .filter((b) => toZonedTime(new Date(b.startTime), timeZone) >= nowZoned)
      .map((b) => ({
        ...b,
        formattedStart: format(
          toZonedTime(new Date(b.startTime), timeZone),
          "MMMM do h:mmaa"
        ),
      }));

    const past = bookings
      .filter((b) => toZonedTime(new Date(b.startTime), timeZone) < nowZoned)
      .map((b) => ({
        ...b,
        formattedStart: format(
          toZonedTime(new Date(b.startTime), timeZone),
          "MMMM do h:mmaa"
        ),
      }));

    setCurrentFormatted(current);
    setPastFormatted(past);
  }, [bookings, timeZone, mounted]);

  useEffect(() => {
    const fetchBookings = async () => {
      setBookingsLoading(true); // NEW
      const res = await fetch("/api/bookings");
      const data = await res.json();
      const bookings = data.bookings.map((b: any) => ({
        id: b.id,
        serviceName: b.service?.name,
        duration: b.service?.duration,
        startTime: b.startTime,
        status: b.status,
      }));
      setBookings(bookings);
      setBookingsLoading(false); // NEW
    };
    if (session) fetchBookings();
  }, [session]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  if (status === "loading" || !mounted) {
    // Inline loader replacement for LoadingOverlay
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-8 w-8 text-[#c83589] mr-2"
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
        <span className="text-[#c83589] font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto pt-12 px-4">
        <h1 className="text-center text-2xl font-bold mb-6 text-[#c83589]">
          Your Bookings
        </h1>

        {/* Only show this message if not loading */}
        {bookings.length === 0 && !bookingsLoading && (
          <div className="text-gray-500 text-center mb-8">
            You have no bookings yet.
          </div>
        )}

        {currentFormatted.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
            <div className="block">
              {currentFormatted.map((b) => (
                <div key={b.id} className="mb-4 p-4 bg-white rounded shadow">
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="font-semibold text-[#c83589]">
                        Service:
                      </span>{" "}
                      {b.serviceName}
                    </div>
                    <div>
                      <span className="font-semibold text-[#c83589]">
                        Date & Time:
                      </span>{" "}
                      {b.formattedStart}
                    </div>
                    <div>
                      <span className="font-semibold text-[#c83589]">
                        Duration:
                      </span>{" "}
                      {b.duration ? `${b.duration} min` : "-"}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-[#c83589]">
                      Status:
                    </span>{" "}
                    <span
                      className={
                        b.status === "pending"
                          ? "text-yellow-600"
                          : b.status === "confirmed"
                          ? "text-green-700"
                          : "text-red-600"
                      }
                    >
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() =>
                        router.push(`/account/bookings/${b.id}/edit`)
                      }
                      className="px-3 py-1 bg-[#c83589] text-white rounded hover:bg-[#ff77a4] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setBookingToDelete(b.id);
                      }}
                      className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {pastFormatted.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mt-8 mb-2">Past Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 rounded shadow mb-20">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Service</th>
                    <th className="px-4 py-2 text-left">Date & Time</th>
                    <th className="px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {pastFormatted.map((b) => (
                    <tr key={b.id} className="border-b">
                      <td className="px-4 py-2">{b.serviceName}</td>
                      <td className="px-4 py-2">{b.formattedStart}</td>
                      <td className="px-4 py-2">
                        {b.duration ? `${b.duration} min` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4 text-[#c83589]">
                Are you sure?
              </h2>
              <p className="mb-6">
                Do you really want to delete this appointment? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setBookingToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    bookingToDelete && handleDelete(bookingToDelete)
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
