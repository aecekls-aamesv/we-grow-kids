import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Integration metadata — never stores secrets/tokens (those go in environment secrets)
export const integrationsTable = pgTable("integrations", {
  id: serial("id").primaryKey(),
  service: text("service").notNull().unique(), // google_calendar | zoom | brevo | twilio | stripe | instagram | facebook
  status: text("status").notNull().default("not_connected"), // not_connected | connected | error | expired
  displayName: text("display_name"),
  accountEmail: text("account_email"), // display only
  lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
  lastError: text("last_error"),
  metadata: text("metadata"), // JSON string of non-sensitive info (e.g. calendar ID, zoom account ID)
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertIntegrationSchema = createInsertSchema(integrationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;
export type Integration = typeof integrationsTable.$inferSelect;
