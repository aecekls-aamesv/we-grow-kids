import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const availabilitySlotsTable = pgTable("availability_slots", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // YYYY-MM-DD
  startTime: text("start_time").notNull(), // HH:MM (24h, Pacific Time)
  endTime: text("end_time").notNull(),
  serviceType: text("service_type").notNull().default("both"), // consultation | tutoring | both
  isBooked: boolean("is_booked").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id"),
  slotId: integer("slot_id"),
  type: text("type").notNull(), // consultation | tutoring
  status: text("status").notNull().default("Pending"), // Pending | Confirmed | Completed | Cancelled | Rescheduled | No-Show
  // Parent/client info (denormalized for history)
  parentName: text("parent_name").notNull(),
  parentEmail: text("parent_email").notNull(),
  parentPhone: text("parent_phone"),
  learnerFirstName: text("learner_first_name"),
  // Scheduling
  scheduledDate: text("scheduled_date").notNull(), // YYYY-MM-DD
  scheduledStartTime: text("scheduled_start_time").notNull(), // HH:MM
  scheduledEndTime: text("scheduled_end_time"),
  timezone: text("timezone").default("America/Los_Angeles"),
  // Integration metadata (never secrets)
  zoomMeetingId: text("zoom_meeting_id"),
  zoomJoinUrl: text("zoom_join_url"),
  calendarEventId: text("calendar_event_id"),
  idempotencyKey: text("idempotency_key"), // prevents duplicate events
  // Admin fields
  notes: text("notes"),
  adminNotes: text("admin_notes"),
  subject: text("subject"),
  cancellationReason: text("cancellation_reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertAvailabilitySlotSchema = createInsertSchema(availabilitySlotsTable).omit({ id: true, createdAt: true });
export type InsertAvailabilitySlot = z.infer<typeof insertAvailabilitySlotSchema>;
export type AvailabilitySlot = typeof availabilitySlotsTable.$inferSelect;

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
