import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { services } from "@/server/db/schema";

export async function GET() {
  console.log("GET /api/services called");
  const allServices = await db.select().from(services).orderBy(services.id);
  console.log(allServices); // Check the order here
  return NextResponse.json(allServices);
}
