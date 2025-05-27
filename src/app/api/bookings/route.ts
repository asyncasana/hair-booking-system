import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";
import { addMinutesToISOString } from "@/lib/utils/time";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/server/auth/config";

// Shape of the session object with user information
type SessionWithUser = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

// API route to handle bookings
// Returns all bookings for the currently logged-in user
export async function GET(_req: Request) {
  const session = (await getServerSession(
    authConfig as any
  )) as SessionWithUser;
  if (!session?.user?.id) {
    return NextResponse.json({ bookings: [] });
  }
  const userId = session.user.id;
  const userBookings = await db.query.bookings.findMany({
    where: (b, { eq }) => eq(b.userId, userId),
  });
  return NextResponse.json({ bookings: userBookings });
}

// API route to handle booking creation
// Expects a JSON body with service ID, start time, and optional user/customer details
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Booking data received:", data);

    // Find the service to get its duration
    const service = await db.query.services.findFirst({
      where: (s, { eq }) => eq(s.id, Number(data.service)),
    });

    // Calculate endTime based on duration
    let endTime = data.startTime;
    if (service && service.duration) {
      console.log("Booking data received:", data);
      console.log("Type of startTime:", typeof data.startTime, data.startTime);
      endTime = addMinutesToISOString(data.startTime, service.duration);
    }

    // Insert booking with correct endTime
    await db.insert(bookings).values({
      serviceId: Number(data.service),
      userId: data.userId || null,
      customerName: data.customerName || "Guest",
      customerEmail: data.customerEmail || null,
      startTime: new Date(data.startTime),
      endTime: new Date(endTime),
      status: "pending",
      notes: "",
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
