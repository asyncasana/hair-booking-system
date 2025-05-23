ALTER TABLE "hair-booking-system_service" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "hair-booking-system_service" ADD COLUMN "is_addon" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "hair-booking-system_service" DROP COLUMN "isActive";--> statement-breakpoint
ALTER TABLE "hair-booking-system_service" DROP COLUMN "isAddon";