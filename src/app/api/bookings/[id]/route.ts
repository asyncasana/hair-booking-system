import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/server/auth/config";
import { eq, and } from "drizzle-orm";
import nodemailer from "nodemailer";

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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "Booking Updated",
    text: `A booking has been updated. Booking ID: ${params.id} customer: ${
      data.customerName || "Guest"
    } at ${new Date(data.startTime)}.`,
  });

  return NextResponse.json({ success: true, result });
}

// Handler for DELETE request to remove a booking by ID
export async function DELETE(req: Request, context: any) {
  const { params } = context;
  const session = (await getServerSession(authConfig as any)) as {
    user?: { id?: string; role?: string };
  };
  if (!session?.user?.id && session?.user?.role !== "admin") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // Fetch booking info before deleting
  const booking = await db.query.bookings.findFirst({
    where: eq(bookings.id, Number(params.id)),
  });

  // If admin, delete any booking; if user, only their own
  const isAdmin = session.user?.role === "admin";
  const whereClause = isAdmin
    ? eq(bookings.id, Number(params.id))
    : and(
        eq(bookings.id, Number(params.id)),
        eq(bookings.userId, session.user.id!)
      );

  await db.delete(bookings).where(whereClause);

  // Send cancellation email to customer if booking exists and has email
  if (booking?.customerEmail) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    // Choose message based on who cancelled
    const subject = "Your booking has been cancelled";
    const text = isAdmin
      ? `Hi ${
          booking.customerName || "there"
        }, your appointment was cancelled by the salon. Please contact us if you have questions.`
      : `Hi ${
          booking.customerName || "there"
        }, your appointment has been successfully cancelled.`;

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: booking.customerEmail,
      subject,
      text,
    });

    // Message to admin when anyone cancelled
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Booking Cancelled",
        text: `A booking has been cancelled by the user. Booking ID: ${
          params.id
        } customer: ${booking.customerName || "Guest"} at ${new Date(
          booking.startTime
        )}.`,
      });
  }

  return NextResponse.json({ success: true });
}
