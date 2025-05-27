import type { Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  connectionString: env.DATABASE_URL,
  tablesFilter: ["hair-booking-system_*"],
} satisfies Config;