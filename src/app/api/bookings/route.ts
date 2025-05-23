import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Booking data received:", data);

  // Find the service to get its duration
  const service = await db.query.services.findFirst({
    where: (s, { eq }) => eq(s.id, Number(data.service)),
  });

  // Calculate endTime based on duration
  let endTime = data.startTime;
  if (service && service.duration) {
    endTime = new Date(
      new Date(data.startTime).getTime() + service.duration * 60000
    ).toISOString();
  }

  // Insert booking with correct endTime
  const result = await db.insert(bookings).values({
    serviceId: Number(data.service),
    userId: data.user.id || null,
    customerName: data.user || "Guest",
    startTime: data.startTime,
    endTime: endTime,
    status: "pending",
    notes: "",
  });

  return NextResponse.json({ success: true, result });
}