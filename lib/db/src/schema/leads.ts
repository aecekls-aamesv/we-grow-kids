import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Lead stages
export const LEAD_STAGES = ["New", "Contacted", "Consultation Booked", "Converted", "Follow-Up", "Closed"] as const;
export type LeadStage = typeof LEAD_STAGES[number];

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  // Parent/Guardian info
  parentName: text("parent_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredContact: text("preferred_contact").default("email"), // email | sms | phone
  timezone: text("timezone").default("America/Los_Angeles"),
  // Learner info
  learnerFirstName: text("learner_first_name"),
  learnerAge: integer("learner_age"),
  learnerGrade: text("learner_grade"),
  // Service request
  subject: text("subject"),
  goals: text("goals"),
  challenges: text("challenges"),
  requestedService: text("requested_service"), // tutoring | consultation | curriculum | other
  // Status / CRM
  stage: text("stage").notNull().default("New"),
  source: text("source").default("website"), // website | referral | social | manual | other
  assignedAction: text("assigned_action"),
  // Consent
  emailConsent: boolean("email_consent").notNull().default(false),
  smsConsent: boolean("sms_consent").notNull().default(false),
  consentTimestamp: timestamp("consent_timestamp", { withTimezone: true }),
  // Meta
  notes: text("notes"),
  preferredDates: text("preferred_dates"),
  hearAboutUs: text("hear_about_us"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const leadActivitiesTable = pgTable("lead_activities", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull(),
  type: text("type").notNull(), // note | email | sms | call | stage_change | booking | automation
  direction: text("direction").default("outbound"), // inbound | outbound
  subject: text("subject"),
  content: text("content"),
  status: text("status").default("sent"), // sent | delivered | failed | bounced | opened | clicked
  performedBy: text("performed_by"), // user id or "system"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

export const insertLeadActivitySchema = createInsertSchema(leadActivitiesTable).omit({ id: true, createdAt: true });
export type InsertLeadActivity = z.infer<typeof insertLeadActivitySchema>;
export type LeadActivity = typeof leadActivitiesTable.$inferSelect;
