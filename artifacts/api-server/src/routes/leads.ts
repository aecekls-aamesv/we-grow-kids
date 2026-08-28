import { Router, type IRouter } from "express";
import { db, leadsTable, leadActivitiesTable } from "@workspace/db";
import { eq, and, like, or, desc, count } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// Public: create lead (form submission)
router.post("/leads", async (req, res): Promise<void> => {
  const {
    parentName, email, phone, preferredContact, timezone,
    learnerFirstName, learnerAge, learnerGrade, subject, goals,
    challenges, requestedService, emailConsent, smsConsent,
    notes, preferredDates, hearAboutUs, source = "website",
  } = req.body;

  if (!parentName || !email) {
    res.status(400).json({ error: "parentName and email are required" });
    return;
  }
  if (emailConsent === undefined || smsConsent === undefined) {
    res.status(400).json({ error: "Consent fields are required" });
    return;
  }

  const [lead] = await db.insert(leadsTable).values({
    parentName, email, phone, preferredContact, timezone,
    learnerFirstName, learnerAge, learnerGrade, subject, goals,
    challenges, requestedService, emailConsent: !!emailConsent,
    smsConsent: !!smsConsent, notes, preferredDates, hearAboutUs,
    source, stage: "New",
    consentTimestamp: emailConsent || smsConsent ? new Date() : undefined,
  }).returning();

  req.log.info({ leadId: lead.id }, "Lead created");
  res.status(201).json(lead);
});

// Admin: list leads with search/filter/pagination
router.get("/leads", requireAdmin, async (req, res): Promise<void> => {
  const { q, stage, source, limit = "50", offset = "0" } = req.query as Record<string, string>;
  const lim = Math.min(parseInt(limit, 10) || 50, 200);
  const off = parseInt(offset, 10) || 0;

  let conditions: any[] = [];
  if (stage) conditions.push(eq(leadsTable.stage, stage));
  if (source) conditions.push(eq(leadsTable.source, source));
  if (q) {
    conditions.push(
      or(
        like(leadsTable.parentName, `%${q}%`),
        like(leadsTable.email, `%${q}%`),
        like(leadsTable.learnerFirstName, `%${q}%`),
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [leads, [{ value: total }]] = await Promise.all([
    db.select().from(leadsTable)
      .where(whereClause)
      .orderBy(desc(leadsTable.createdAt))
      .limit(lim).offset(off),
    db.select({ value: count() }).from(leadsTable).where(whereClause),
  ]);

  res.json({ leads, total: Number(total) });
});

// Admin: get lead by ID
router.get("/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
  if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }
  res.json(lead);
});

// Admin: update lead
router.patch("/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowedFields = [
    "parentName","email","phone","preferredContact","timezone",
    "learnerFirstName","learnerAge","learnerGrade","subject","goals",
    "challenges","requestedService","stage","source","assignedAction",
    "emailConsent","smsConsent","notes","preferredDates",
  ];
  const updates: Record<string, any> = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields to update" }); return;
  }

  const [lead] = await db.update(leadsTable).set(updates)
    .where(eq(leadsTable.id, id)).returning();
  if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }

  // Audit
  req.log.info({ leadId: id, performedBy: (req as any).user?.id, changes: updates }, "Lead updated");
  res.json(lead);
});

// Admin: delete lead
router.delete("/leads/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [lead] = await db.delete(leadsTable).where(eq(leadsTable.id, id)).returning();
  if (!lead) { res.status(404).json({ error: "Lead not found" }); return; }
  res.sendStatus(204);
});

// Admin: get lead activities
router.get("/leads/:id/activities", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const activities = await db.select().from(leadActivitiesTable)
    .where(eq(leadActivitiesTable.leadId, id))
    .orderBy(desc(leadActivitiesTable.createdAt));
  res.json(activities);
});

// Admin: add activity to lead
router.post("/leads/:id/activities", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const { type, direction, subject, content, status } = req.body;
  if (!type) { res.status(400).json({ error: "type is required" }); return; }

  const [activity] = await db.insert(leadActivitiesTable).values({
    leadId: id, type, direction, subject, content, status,
    performedBy: (req as any).user?.id ?? "admin",
  }).returning();

  res.status(201).json(activity);
});

export default router;
