import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/server/auth/config";
import { eq, and } from "drizzle-orm";

// Handler for GET request to fetch a booking by ID
export async function GET(req: Request, context: any) {
  const { params } = context;
  const session = (await getServerSession(authConfig as any)) as {
    user?: { id?: string };
  };
  if (!session?.user?.id) {
    return NextResponse.json({ booking: null }, { status: 401 });
  }
  const booking = await db.query.bookings.findFirst({
    where: and(
      eq(bookings.id, Number(params.id)),
      eq(bookings.userId, session.user.id!)
    ),
    with: { service: true },
  });
  return NextResponse.json({ booking: booking || null });
}

// Handler for PATCH request to update a booking by ID
export async function PATCH(req: Request, context: any) {
  const { params } = context;
  const session = (await getServerSession(authConfig as any)) as {
    user?: { id?: string };
  };
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const data = await req.json();

  // Convert times to Date if they're strings
  if (data.startTime && typeof data.startTime === "string") {
    data.startTime = new Date(data.startTime);
  }
  if (data.endTime && typeof data.endTime === "string") {
    data.endTime = new Date(data.endTime);
  }

  const result = await db
    .update(bookings)
    .set({
      startTime: data.startTime,
      ...(data.endTime && { endTime: data.endTime }),
    })
    .where(
      and(
        eq(bookings.id, Number(params.id)),
        eq(bookings.userId, session.user.id!)
      )
    );

  return NextResponse.json({ success: true, result });
}

// Handler for DELETE request to remove a booking by ID
export async function DELETE(req: Request, context: any) {
  const { params } = context;
  const session = (await getServerSession(authConfig as any)) as {
    user?: { id?: string };
  };
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  await db
    .delete(bookings)
    .where(
      and(
        eq(bookings.id, Number(params.id)),
        eq(bookings.userId, session.user.id!)
      )
    );
  return NextResponse.json({ success: true });
}
