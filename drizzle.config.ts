import type { Config } from "drizzle-kit";
import { parse } from "pg-connection-string";

const dbUrl = process.env.DATABASE_URL!;
const { host, port, user, password, database } = parse(dbUrl);

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  tablesFilter: ["hair-booking-system_*"],
  dialect: "postgresql",
  dbCredentials: {
    host: host!,
    port: port ? Number(port) : 5432,
    user: user!,
    password: password!,
    database: database!,
    ssl: "require",
  },
} satisfies Config;