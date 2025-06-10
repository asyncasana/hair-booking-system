import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { bookings } from "@/server/db/schema";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/server/auth/config";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

type AdminSession = {
  user?: {
    email?: string;
    role?: string;
  };
};

export async function GET(req: Request) {
  const session = (await getServerSession(authConfig as any)) as AdminSession;
  if (!session?.user?.email || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const allBookings = await db.query.bookings.findMany({
    with: { service: true, user: true },
  });
  return NextResponse.json({ bookings: allBookings });
}

export async function PATCH(req: Request) {
  const session = (await getServerSession(authConfig as any)) as AdminSession;
  if (!session?.user?.email || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }
  // Update booking and get updated row
  const result = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, Number(id)))
    .returning();

  const booking = result[0];

  // Send confirmation email if status is "confirmed" and customerEmail exists
  if (status === "confirmed" && booking?.customerEmail) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: booking.customerEmail,
      subject: "Your booking is confirmed!",
      text: `Hi ${
        booking.customerName || "there"
      }, your appointment has been confirmed. See you soon!`,
    });
  }

  return NextResponse.json({ success: true, result });
}
