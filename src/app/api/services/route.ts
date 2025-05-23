import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { services } from "@/server/db/schema";

export async function GET() {
  const allServices = await db.select().from(services);
  return NextResponse.json(allServices);
}