import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getServerSession } from "next-auth";
import { authConfig } from "@/server/auth/config";
import { eq } from "drizzle-orm";

// This route handles user information to show on the account page.
export async function GET(req: Request) {
  const session = await getServerSession(authConfig as any);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });
  return NextResponse.json({ user });
}

// This route handles user account updates, such as name, phone number and image.
export async function PUT(req: Request) {
  const session = await getServerSession(authConfig as any);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, phone, image } = await req.json();
  await db
    .update(users)
    .set({ name, phone, image })
    .where(eq(users.email, session.user.email));
  return NextResponse.json({ success: true });
}
