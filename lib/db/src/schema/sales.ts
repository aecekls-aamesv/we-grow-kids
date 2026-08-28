import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // book | curriculum | other
  sku: text("sku"),
  description: text("description"),
  priceInCents: integer("price_in_cents").notNull().default(0),
  active: text("active").notNull().default("true"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id"),
  leadId: integer("lead_id"),
  buyerName: text("buyer_name").notNull(),
  buyerEmail: text("buyer_email").notNull(),
  quantity: integer("quantity").notNull().default(1),
  grossAmountInCents: integer("gross_amount_in_cents").notNull().default(0),
  discountAmountInCents: integer("discount_amount_in_cents").notNull().default(0),
  refundAmountInCents: integer("refund_amount_in_cents").notNull().default(0),
  netAmountInCents: integer("net_amount_in_cents").notNull().default(0),
  paymentStatus: text("payment_status").notNull().default("pending"), // pending | paid | refunded | failed
  fulfillmentStatus: text("fulfillment_status").notNull().default("unfulfilled"), // unfulfilled | fulfilled | cancelled
  source: text("source").default("manual"), // manual | stripe | shopify | other
  externalOrderId: text("external_order_id"),
  dataSource: text("data_source").default("manual"), // manual | synced
  notes: text("notes"),
  orderDate: text("order_date").notNull(), // YYYY-MM-DD
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
