"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/_components/LoadingOverlay";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Booking = {
  id: string;
  serviceName: string;
  duration?: number;
  startTime: string;
};

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();
  const timeZone = "Europe/London";
  const [mounted, setMounted] = useState(false);
  const [currentFormatted, setCurrentFormatted] = useState<any[]>([]);
  const [pastFormatted, setPastFormatted] = useState<any[]>([]);

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
      const res = await fetch("/api/bookings");
      const data = await res.json();
      const bookings = data.bookings.map((b: any) => ({
        id: b.id,
        serviceName: b.service?.name,
        duration: b.service?.duration,
        startTime: b.startTime,
      }));
      setBookings(bookings);
    };
    if (session) fetchBookings();
  }, [session]);

  if (status === "loading" || !mounted) {
    return <LoadingOverlay />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto pt-12 px-4">
        <h1 className="text-center text-2xl font-bold mb-6 text-[#c83589]">
          Your Bookings
        </h1>

        {bookings.length === 0 && (
          <div className="text-gray-500 text-center mb-8">
            You have no bookings yet.
          </div>
        )}

        {currentFormatted.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>

              <div className="block md:hidden">
                {currentFormatted.map((b) => (
                  <div key={b.id} className="mb-4 p-4 bg-white rounded shadow">
                    <div className="font-semibold">{b.serviceName}</div>
                    <div className="text-sm text-gray-600">
                      {b.formattedStart}
                    </div>
                    <div className="text-sm">
                      {b.duration ? `${b.duration} min` : "-"}
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
                        onClick={async () => {
                          await fetch(`/api/bookings/${b.id}`, {
                            method: "DELETE",
                          });
                          setBookings((prev) =>
                            prev.filter((booking) => booking.id !== b.id)
                          );
                        }}
                        className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
                      >
                        Delete
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
              <table className="min-w-full bg-gray-50 rounded shadow">
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
      </div>
    </div>
  );
}
