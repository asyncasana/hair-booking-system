import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // "YYYY-MM-DD"
  if (!date) return NextResponse.json({ bookedSlots: [] });

  // Fetch bookings for that date
  const allBookings = await db.query.bookings.findMany();
  const bookedSlots = allBookings
    .filter((b) => {
      const d = new Date(b.startTime);
      d.setHours(d.getHours() + 1); // Adjust for DB offset
      return (
        d.toISOString().slice(0, 10) === date &&
        (b.status === "pending" || b.status === "confirmed")
      );
    })
    .map((b) => {
      const d = new Date(b.startTime);
      d.setHours(d.getHours() + 1);
      return d.toISOString().slice(11, 16);
    });
  return NextResponse.json({ bookedSlots });
}
