import { Router, type IRouter } from "express";
import { db, automationsTable, automationLogsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/automations", requireAdmin, async (req, res): Promise<void> => {
  const automations = await db.select().from(automationsTable)
    .orderBy(automationsTable.name);
  res.json(automations);
});

router.post("/automations", requireAdmin, async (req, res): Promise<void> => {
  const {
    name, trigger, channel, delayMinutes,
    emailSubjectTemplate, emailBodyTemplate, smsBodyTemplate,
    requiresEmailConsent = true, requiresSmsConsent = true,
  } = req.body;
  if (!name || !trigger || !channel) {
    res.status(400).json({ error: "name, trigger, and channel are required" }); return;
  }
  const [automation] = await db.insert(automationsTable).values({
    name, trigger, channel, delayMinutes, emailSubjectTemplate,
    emailBodyTemplate, smsBodyTemplate, requiresEmailConsent, requiresSmsConsent,
    enabled: false, // always off by default
  }).returning();
  res.status(201).json(automation);
});

router.patch("/automations/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowedFields = [
    "name","trigger","channel","enabled","delayMinutes",
    "emailSubjectTemplate","emailBodyTemplate","smsBodyTemplate",
    "requiresEmailConsent","requiresSmsConsent",
  ];
  const updates: Record<string, any> = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const [automation] = await db.update(automationsTable).set(updates)
    .where(eq(automationsTable.id, id)).returning();
  if (!automation) { res.status(404).json({ error: "Not found" }); return; }
  req.log.info({ automationId: id, enabled: updates.enabled }, "Automation updated");
  res.json(automation);
});

router.get("/automations/:id/logs", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const limit = parseInt((req.query.limit as string) || "50", 10);
  const logs = await db.select().from(automationLogsTable)
    .where(eq(automationLogsTable.automationId, id))
    .orderBy(desc(automationLogsTable.createdAt))
    .limit(limit);
  res.json(logs);
});

router.post("/automations/:id/test", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { recipientEmail } = req.body;
  if (!recipientEmail) { res.status(400).json({ error: "recipientEmail required" }); return; }
  
  const [automation] = await db.select().from(automationsTable)
    .where(eq(automationsTable.id, id));
  if (!automation) { res.status(404).json({ error: "Not found" }); return; }
  
  // Log the test attempt — actual sending requires integration (Brevo/Twilio)
  req.log.info({ automationId: id, recipientEmail }, "Automation test send requested (integration not yet connected)");
  res.json({ success: true, message: "Test logged. Connect Brevo/Twilio integration to enable sending." });
});

export default router;
