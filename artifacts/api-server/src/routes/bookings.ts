import { Router, type IRouter } from "express";
import { db, bookingsTable, availabilitySlotsTable } from "@workspace/db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

// Public + Admin: create booking
router.post("/bookings", async (req, res): Promise<void> => {
  const {
    leadId, slotId, type, parentName, parentEmail, parentPhone,
    learnerFirstName, scheduledDate, scheduledStartTime, scheduledEndTime,
    timezone = "America/Los_Angeles", notes, subject,
  } = req.body;

  if (!type || !parentName || !parentEmail || !scheduledDate || !scheduledStartTime) {
    res.status(400).json({ error: "type, parentName, parentEmail, scheduledDate, scheduledStartTime are required" });
    return;
  }

  // Check for double-booking
  if (slotId) {
    const [slot] = await db.select().from(availabilitySlotsTable)
      .where(eq(availabilitySlotsTable.id, slotId));
    if (!slot) { res.status(404).json({ error: "Slot not found" }); return; }
    if (slot.isBooked) { res.status(409).json({ error: "This slot is already booked" }); return; }
    // Mark slot as booked
    await db.update(availabilitySlotsTable)
      .set({ isBooked: true })
      .where(eq(availabilitySlotsTable.id, slotId));
  }

  const idempotencyKey = `${parentEmail}-${scheduledDate}-${scheduledStartTime}`;

  const [booking] = await db.insert(bookingsTable).values({
    leadId, slotId, type, parentName, parentEmail, parentPhone,
    learnerFirstName, scheduledDate, scheduledStartTime, scheduledEndTime,
    timezone, notes, subject, status: "Pending", idempotencyKey,
  }).returning();

  req.log.info({ bookingId: booking.id }, "Booking created");
  res.status(201).json(booking);
});

// Admin: list bookings
router.get("/bookings", requireAdmin, async (req, res): Promise<void> => {
  const { startDate, endDate, type, status } = req.query as Record<string, string>;
  let conditions: any[] = [];
  if (startDate) conditions.push(gte(bookingsTable.scheduledDate, startDate));
  if (endDate) conditions.push(lte(bookingsTable.scheduledDate, endDate));
  if (type) conditions.push(eq(bookingsTable.type, type));
  if (status) conditions.push(eq(bookingsTable.status, status));

  const bookings = await db.select().from(bookingsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(bookingsTable.scheduledDate));
  res.json(bookings);
});

// Admin: get booking by ID
router.get("/bookings/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
  if (!booking) { res.status(404).json({ error: "Booking not found" }); return; }
  res.json(booking);
});

// Admin: update booking (reschedule, cancel, add notes)
router.patch("/bookings/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowedFields = [
    "status", "scheduledDate", "scheduledStartTime", "scheduledEndTime",
    "timezone", "adminNotes", "cancellationReason", "slotId",
    "zoomMeetingId", "zoomJoinUrl", "calendarEventId",
  ];
  const updates: Record<string, any> = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const [booking] = await db.update(bookingsTable).set(updates)
    .where(eq(bookingsTable.id, id)).returning();
  if (!booking) { res.status(404).json({ error: "Booking not found" }); return; }

  req.log.info({ bookingId: id, updates }, "Booking updated");
  res.json(booking);
});

export default router;
