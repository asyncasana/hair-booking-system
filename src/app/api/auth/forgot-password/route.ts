import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) {
    return NextResponse.json(
      { error: "No user with that email" },
      { status: 404 }
    );
  }
  // Block password reset for Google-only users
  if (!user.password) {
    return NextResponse.json(
      { error: "This account uses Google login. Please sign in with Google." },
      { status: 400 }
    );
  }
  // Generate token and expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  try {
    // Save token and expiry to user
    await db
      .update(users)
      .set({ resetToken: token, resetTokenExpiry: expires })
      .where(eq(users.email, email));

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Reset your password: ${baseUrl}/reset-password?token=${token}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
