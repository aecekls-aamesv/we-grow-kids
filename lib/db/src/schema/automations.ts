import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const AUTOMATION_TRIGGERS = [
  "booking_confirmed",
  "admin_notification",
  "reminder_24h",
  "reminder_2h",
  "reschedule_notice",
  "cancellation_notice",
  "missed_appointment",
  "post_consultation_followup",
  "tutoring_reminder",
  "custom",
] as const;

export const automationsTable = pgTable("automations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  trigger: text("trigger").notNull(),
  channel: text("channel").notNull().default("email"), // email | sms | both
  enabled: boolean("enabled").notNull().default(false), // admin must explicitly enable
  delayMinutes: integer("delay_minutes").default(0),
  emailSubjectTemplate: text("email_subject_template"),
  emailBodyTemplate: text("email_body_template"),
  smsBodyTemplate: text("sms_body_template"),
  requiresEmailConsent: boolean("requires_email_consent").notNull().default(true),
  requiresSmsConsent: boolean("requires_sms_consent").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const automationLogsTable = pgTable("automation_logs", {
  id: serial("id").primaryKey(),
  automationId: integer("automation_id").notNull(),
  leadId: integer("lead_id"),
  bookingId: integer("booking_id"),
  channel: text("channel").notNull(), // email | sms
  recipient: text("recipient").notNull(),
  subject: text("subject"),
  body: text("body"),
  status: text("status").notNull().default("pending"), // pending | sent | delivered | failed | bounced
  errorMessage: text("error_message"),
  providerMessageId: text("provider_message_id"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAutomationSchema = createInsertSchema(automationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAutomation = z.infer<typeof insertAutomationSchema>;
export type Automation = typeof automationsTable.$inferSelect;

export const insertAutomationLogSchema = createInsertSchema(automationLogsTable).omit({ id: true, createdAt: true });
export type InsertAutomationLog = z.infer<typeof insertAutomationLogSchema>;
export type AutomationLog = typeof automationLogsTable.$inferSelect;
