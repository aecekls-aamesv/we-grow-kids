import { Router, type IRouter } from "express";
import { db, availabilitySlotsTable } from "@workspace/db";
import { eq, and, gte, lte } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

// Public: list available slots (filtered by date and service type)
router.get("/availability", async (req, res): Promise<void> => {
  const { startDate, endDate, serviceType, availableOnly } = req.query as Record<string, string>;
  let conditions: any[] = [];
  if (startDate) conditions.push(gte(availabilitySlotsTable.date, startDate));
  if (endDate) conditions.push(lte(availabilitySlotsTable.date, endDate));
  if (serviceType) conditions.push(eq(availabilitySlotsTable.serviceType, serviceType));
  if (availableOnly === "true") conditions.push(eq(availabilitySlotsTable.isBooked, false));

  const slots = await db.select().from(availabilitySlotsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(availabilitySlotsTable.date, availabilitySlotsTable.startTime);
  res.json(slots);
});

// Admin: create availability slot
router.post("/availability", requireAdmin, async (req, res): Promise<void> => {
  const { date, startTime, endTime, serviceType = "both", notes } = req.body;
  if (!date || !startTime || !endTime) {
    res.status(400).json({ error: "date, startTime, and endTime are required" }); return;
  }
  const [slot] = await db.insert(availabilitySlotsTable)
    .values({ date, startTime, endTime, serviceType, notes })
    .returning();
  res.status(201).json(slot);
});

// Admin: delete availability slot
router.delete("/availability/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [slot] = await db.delete(availabilitySlotsTable)
    .where(eq(availabilitySlotsTable.id, id)).returning();
  if (!slot) { res.status(404).json({ error: "Slot not found" }); return; }
  res.sendStatus(204);
});

export default router;
