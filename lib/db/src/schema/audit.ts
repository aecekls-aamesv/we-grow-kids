import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const auditLogsTable = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  performedBy: text("performed_by").notNull(), // user id
  action: text("action").notNull(), // e.g. "lead.update", "booking.cancel", "automation.enable"
  entityType: text("entity_type"), // lead | booking | automation | integration | order | social_post
  entityId: text("entity_id"),
  changes: text("changes"), // JSON diff string
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
