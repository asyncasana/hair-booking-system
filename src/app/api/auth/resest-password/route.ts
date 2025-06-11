import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";
import { eq, and, gt } from "drizzle-orm";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Find user by token and check expiry
  const user = await db.query.users.findFirst({
    where: (u, { eq, and, gt }) =>
      and(eq(u.resetToken, token), gt(u.resetTokenExpiry, new Date())),
  });
  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
  // Update password and clear token
  const hashed = await bcrypt.hash(password, 10);
  await db
    .update(users)
    .set({ password: hashed, resetToken: null, resetTokenExpiry: null })
    .where(eq(users.id, user.id));
  return NextResponse.json({ success: true });
}
