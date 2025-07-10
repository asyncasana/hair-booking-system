"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  customerName: string;
  customerEmail: string;
  service?: { name: string };
  startTime: string;
  status: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  const now = new Date();

  // Filter out old cancelled bookings
  const filteredBookings = bookings.filter((b) => {
    if (b.status !== "cancelled") return true;
    const startDate = new Date(b.startTime);
    const diffDays =
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  });

  // Sort newest first
  const sortedBookings = filteredBookings.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8">No bookings found.</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse bg-white rounded shadow overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border-b">Customer</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Service</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedBookings.map((b) => {
                  const isPast = new Date(b.startTime) <= new Date();
                  return (
                    <tr key={b.id}>
                      <td className="p-3 border-b">{b.customerName}</td>
                      <td className="p-3 border-b">{b.customerEmail}</td>
                      <td className="p-3 border-b">{b.service?.name}</td>
                      <td className="p-3 border-b">
                        {new Date(b.startTime).toLocaleString("en-GB", {
                          timeZone: "Europe/London",
                        })}
                      </td>
                      <td className="p-3 border-b">
                        <span
                          className={`px-3 py-1 rounded font-medium ${
                            b.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : b.status === "confirmed"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 border-b">
                        {!isPast && b.status === "pending" && (
                          <button
                            className="mr-2 px-3 py-1 bg-green-500 text-white rounded font-medium"
                            onClick={async () => {
                              await fetch("/api/admin/bookings", {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  id: b.id,
                                  status: "confirmed",
                                }),
                              });
                              const res = await fetch("/api/admin/bookings");
                              const data = await res.json();
                              setBookings(data.bookings);
                            }}
                          >
                            Confirm
                          </button>
                        )}
                        {!isPast && (
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded font-medium"
                            onClick={async () => {
                              await fetch(`/api/bookings/${b.id}`, {
                                method: "DELETE",
                              });
                              const res = await fetch("/api/admin/bookings");
                              const data = await res.json();
                              setBookings(data.bookings);
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {sortedBookings.map((b) => {
              const isPast = new Date(b.startTime) <= new Date();
              return (
                <div
                  key={b.id}
                  className="bg-white rounded shadow p-4 text-sm space-y-2"
                >
                  <div>
                    <strong>Customer:</strong> {b.customerName}
                  </div>
                  <div>
                    <strong>Email:</strong> {b.customerEmail}
                  </div>
                  <div>
                    <strong>Service:</strong> {b.service?.name}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {new Date(b.startTime).toLocaleString("en-GB", {
                      timeZone: "Europe/London",
                    })}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded font-medium ${
                        b.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : b.status === "confirmed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {!isPast && b.status === "pending" && (
                      <button
                        className="flex-1 px-3 py-1 bg-green-500 text-white rounded font-medium"
                        onClick={async () => {
                          await fetch("/api/admin/bookings", {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: b.id,
                              status: "confirmed",
                            }),
                          });
                          const res = await fetch("/api/admin/bookings");
                          const data = await res.json();
                          setBookings(data.bookings);
                        }}
                      >
                        Confirm
                      </button>
                    )}
                    {!isPast && (
                      <button
                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded font-medium"
                        onClick={async () => {
                          await fetch(`/api/bookings/${b.id}`, {
                            method: "DELETE",
                          });
                          const res = await fetch("/api/admin/bookings");
                          const data = await res.json();
                          setBookings(data.bookings);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
