import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// Export the database schema
export const createTable = pgTableCreator(
	(name) => `hair-booking-system_${name}`,
);

// Services table
export const services = createTable("service", (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 100 }).notNull(),
    description: d.varchar({ length: 255 }),
    price: d.integer().notNull(), // price in cents or pounds
    duration: d.integer().notNull(), // in minutes
    isActive: d.boolean().default(true),
	isAddon: d.boolean().default(false),
}));

export const servicesRelations = relations(services, ({ many }) => ({
    bookings: many(bookings),
}));

// Bookings table, with userId foreign key
export const bookings = createTable("booking", (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    customerName: d.varchar({ length: 100 }).notNull(),
    customerEmail: d.varchar({ length: 100 }),
    customerPhone: d.varchar({ length: 30 }),
    serviceId: d.integer().notNull().references(() => services.id),
    userId: d.varchar({ length: 255 }).references(() => users.id), // <-- user connection
    startTime: d.timestamp({ withTimezone: true }).notNull(),
    endTime: d.timestamp({ withTimezone: true }).notNull(),
    status: d.varchar({ length: 20 }).default("pending"),
    notes: d.varchar({ length: 255 }),
    createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
    service: one(services, { fields: [bookings.serviceId], references: [services.id] }),
    user: one(users, { fields: [bookings.userId], references: [users.id] }), // <-- user relation
}));

// Users table
export const users = createTable("user", (d) => ({
	id: d
		.varchar({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.varchar({ length: 255 }),
	email: d.varchar({ length: 255 }).notNull(),
	emailVerified: d
		.timestamp({
			mode: "date",
			withTimezone: true,
		})
		.default(sql`CURRENT_TIMESTAMP`),
	image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

// Accounts table
// This table is used to store user accounts for authentication
export const accounts = createTable(
	"account",
	(d) => ({
		userId: d
			.varchar({ length: 255 })
			.notNull()
			.references(() => users.id),
		type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
		provider: d.varchar({ length: 255 }).notNull(),
		providerAccountId: d.varchar({ length: 255 }).notNull(),
		refresh_token: d.text(),
		access_token: d.text(),
		expires_at: d.integer(),
		token_type: d.varchar({ length: 255 }),
		scope: d.varchar({ length: 255 }),
		id_token: d.text(),
		session_state: d.varchar({ length: 255 }),
	}),
	(t) => [
		primaryKey({ columns: [t.provider, t.providerAccountId] }),
		index("account_user_id_idx").on(t.userId),
	],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

// Sessions table
// This table is used to store user sessions for authentication
export const sessions = createTable(
	"session",
	(d) => ({
		sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
		userId: d
			.varchar({ length: 255 })
			.notNull()
			.references(() => users.id),
		expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
	}),
	(t) => [index("t_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));


// Verification Tokens table
// This table is used to store verification tokens for authentication
export const verificationTokens = createTable(
	"verification_token",
	(d) => ({
		identifier: d.varchar({ length: 255 }).notNull(),
		token: d.varchar({ length: 255 }).notNull(),
		expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
	}),
	(t) => [primaryKey({ columns: [t.identifier, t.token] })],
);
