"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/_components/LoadingOverlay";
import ContactForm from "@/app/_components/ContactForm";

type Booking = {
  id: string;
  service: string;
  date: string; // ISO string
  time: string;
  // ...other fields
};

export default function BookingsPage() {
  // All hooks at the top!
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Example: Replace with fetch logic
    // setBookings(fetchedBookings);
  }, []);

  // Loading overlay check after hooks
  if (status === "loading") {
    return <LoadingOverlay />;
  }

  // Split bookings into past and current
  const now = new Date();
  const currentBookings = bookings.filter(
    (b) => new Date(`${b.date}T${b.time}`) >= now
  );
  const pastBookings = bookings.filter(
    (b) => new Date(`${b.date}T${b.time}`) < now
  );
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

        {currentBookings.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
            <ul>
              {currentBookings.map((b) => (
                <li key={b.id} className="mb-4 border-b pb-2">
                  <div>{b.service}</div>
                  <div>
                    {b.date} at {b.time}
                  </div>
                  {/* Add Edit/Cancel buttons here */}
                </li>
              ))}
            </ul>
          </>
        )}

        {pastBookings.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mt-8 mb-2">Past Bookings</h2>
            <ul>
              {pastBookings.map((b) => (
                <li key={b.id} className="mb-4 border-b pb-2">
                  <div>{b.service}</div>
                  <div>
                    {b.date} at {b.time}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-12 w-full flex flex-col items-center mb-5">
          <button
            onClick={() => router.push("/book")}
            className="w-50 mt-6 px-4 py-2 bg-[#c83589] text-white rounded font-semibold hover:bg-[#ff77a4] transition"
          >
            Book Appointment
          </button>
          <button
            onClick={() => router.push("/account")}
            className="w-50 mt-2 px-4 py-2 bg-gray-200 text-gray-600 rounded font-semibold hover:bg-gray-300 transition"
          >
            Back to Account
          </button>
        </div>
      </div>
      <div className="mt-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
