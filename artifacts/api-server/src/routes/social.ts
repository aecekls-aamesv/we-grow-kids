import { Router, type IRouter } from "express";
import { db, socialPostsTable } from "@workspace/db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/social-posts", requireAdmin, async (req, res): Promise<void> => {
  const { platform, status, startDate, endDate } = req.query as Record<string, string>;
  let conditions: any[] = [];
  if (platform) conditions.push(eq(socialPostsTable.platform, platform));
  if (status) conditions.push(eq(socialPostsTable.status, status));
  if (startDate) conditions.push(gte(socialPostsTable.createdAt, new Date(startDate)));
  if (endDate) conditions.push(lte(socialPostsTable.createdAt, new Date(endDate)));

  const posts = await db.select().from(socialPostsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(socialPostsTable.createdAt));
  res.json(posts);
});

router.post("/social-posts", requireAdmin, async (req, res): Promise<void> => {
  const {
    platform, campaign, caption, mediaUrl, mediaType,
    scheduledAt, notes,
  } = req.body;
  if (!platform) { res.status(400).json({ error: "platform is required" }); return; }
  const [post] = await db.insert(socialPostsTable).values({
    platform, campaign, caption, mediaUrl, mediaType,
    scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
    notes, status: "Idea", // default to Idea, must go through approval
  }).returning();
  res.status(201).json(post);
});

router.patch("/social-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowed = ["platform","campaign","caption","mediaUrl","mediaType","scheduledAt","status","approvedBy","notes","errorMessage"];
  const updates: Record<string, any> = {};
  for (const f of allowed) {
    if (req.body[f] !== undefined) {
      updates[f] = f === "scheduledAt" && req.body[f] ? new Date(req.body[f]) : req.body[f];
    }
  }

  // Safety: cannot publish without approval
  if (updates.status === "Published" && !updates.approvedBy) {
    res.status(403).json({ error: "Cannot publish without approvedBy" }); return;
  }

  const [post] = await db.update(socialPostsTable).set(updates)
    .where(eq(socialPostsTable.id, id)).returning();
  if (!post) { res.status(404).json({ error: "Not found" }); return; }
  res.json(post);
});

router.delete("/social-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [post] = await db.delete(socialPostsTable)
    .where(eq(socialPostsTable.id, id)).returning();
  if (!post) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

export default router;
