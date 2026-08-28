import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const SOCIAL_STATUSES = ["Idea", "Draft", "Needs Approval", "Approved", "Scheduled", "Published", "Failed"] as const;
export type SocialStatus = typeof SOCIAL_STATUSES[number];

export const socialPostsTable = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // instagram | facebook | tiktok | twitter | linkedin
  campaign: text("campaign"),
  caption: text("caption"),
  mediaUrl: text("media_url"), // stored object path
  mediaType: text("media_type"), // image | video | carousel
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  status: text("status").notNull().default("Idea"),
  approvedBy: text("approved_by"),
  externalPostId: text("external_post_id"),
  likes: text("likes").default("0"),
  comments: text("comments").default("0"),
  reach: text("reach").default("0"),
  errorMessage: text("error_message"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSocialPostSchema = createInsertSchema(socialPostsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;
export type SocialPost = typeof socialPostsTable.$inferSelect;
