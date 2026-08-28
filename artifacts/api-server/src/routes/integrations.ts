import { Router, type IRouter } from "express";
import { db, integrationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const DEFAULT_INTEGRATIONS = [
  { service: "google_calendar", displayName: "Google Calendar" },
  { service: "zoom", displayName: "Zoom" },
  { service: "brevo", displayName: "Brevo (Email)" },
  { service: "twilio", displayName: "Twilio (SMS)" },
  { service: "stripe", displayName: "Stripe / Commerce" },
  { service: "instagram", displayName: "Instagram" },
  { service: "facebook", displayName: "Facebook" },
];

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

// Ensure all default integrations exist in DB
async function ensureDefaults() {
  for (const integ of DEFAULT_INTEGRATIONS) {
    await db.insert(integrationsTable)
      .values({ service: integ.service, displayName: integ.displayName, status: "not_connected" })
      .onConflictDoNothing();
  }
}

router.get("/integrations", requireAdmin, async (req, res): Promise<void> => {
  await ensureDefaults();
  const integrations = await db.select().from(integrationsTable)
    .orderBy(integrationsTable.service);
  res.json(integrations);
});

router.post("/integrations/:service/disconnect", requireAdmin, async (req, res): Promise<void> => {
  const service = Array.isArray(req.params.service) ? req.params.service[0] : req.params.service;
  const [integration] = await db.update(integrationsTable)
    .set({ status: "not_connected", accountEmail: null, lastError: null, metadata: null })
    .where(eq(integrationsTable.service, service))
    .returning();
  if (!integration) { res.status(404).json({ error: "Integration not found" }); return; }
  req.log.info({ service }, "Integration disconnected");
  res.json(integration);
});

router.patch("/integrations/:service/status", requireAdmin, async (req, res): Promise<void> => {
  const service = Array.isArray(req.params.service) ? req.params.service[0] : req.params.service;
  const { status, displayName, accountEmail, lastError, metadata } = req.body;
  const updates: Record<string, any> = {};
  if (status !== undefined) updates.status = status;
  if (displayName !== undefined) updates.displayName = displayName;
  if (accountEmail !== undefined) updates.accountEmail = accountEmail;
  if (lastError !== undefined) updates.lastError = lastError;
  if (metadata !== undefined) updates.metadata = metadata;

  const [integration] = await db.update(integrationsTable).set(updates)
    .where(eq(integrationsTable.service, service))
    .returning();
  if (!integration) { res.status(404).json({ error: "Integration not found" }); return; }
  res.json(integration);
});

export default router;
