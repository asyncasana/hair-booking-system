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

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>All Bookings</h1>
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          No bookings found.
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <thead style={{ background: "#f3f3f3" }}>
            <tr>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                Customer
              </th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                Service
              </th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                Date
              </th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                Status
              </th>
              <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(bookings ?? []).map((b) => {
              const isPast = new Date(b.startTime) <= new Date();

              return (
                <tr key={b.id}>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {b.customerName}
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {b.service?.name}
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {new Date(b.startTime).toLocaleString("en-GB", {
                      timeZone: "Europe/London",
                    })}
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.25em 0.75em",
                        borderRadius: 12,
                        background:
                          b.status === "pending"
                            ? "#ffe58f"
                            : b.status === "confirmed"
                            ? "#b7eb8f"
                            : "#ffa39e",
                        color:
                          b.status === "pending"
                            ? "#ad6800"
                            : b.status === "confirmed"
                            ? "#237804"
                            : "#a8071a",
                        fontWeight: 500,
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {!isPast && b.status === "pending" && (
                      <button
                        style={{
                          marginRight: 8,
                          padding: "6px 16px",
                          background: "#52c41a",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                        onClick={async () => {
                          await fetch("/api/admin/bookings", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
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
                        style={{
                          padding: "6px 16px",
                          background: "#ff4d4f",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
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
      )}
    </div>
  );
}
