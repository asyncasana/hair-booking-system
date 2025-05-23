import { db } from "@/server/db";
import { services } from "@/server/db/schema";

export async function getAllServices() {
  return db.select().from(services);
}