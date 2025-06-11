ALTER TABLE "hair-booking-system_user" ADD COLUMN "resetToken" varchar(255);--> statement-breakpoint
ALTER TABLE "hair-booking-system_user" ADD COLUMN "resetTokenExpiry" timestamp with time zone;