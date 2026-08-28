import { Router, type IRouter } from "express";
import { db, leadsTable, bookingsTable, ordersTable, automationLogsTable } from "@workspace/db";
import { eq, and, gte, count, sum, desc } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/admin/dashboard/summary", requireAdmin, async (req, res): Promise<void> => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);

  const [
    [{ newInquiries }],
    [{ consultationsBooked }],
    [{ tutoringCount }],
    [{ outstandingFollowUps }],
    [{ totalRevenue }],
    [{ emailDeliveryRate }],
  ] = await Promise.all([
    db.select({ newInquiries: count() }).from(leadsTable)
      .where(gte(leadsTable.createdAt, thirtyDaysAgo)),
    db.select({ consultationsBooked: count() }).from(bookingsTable)
      .where(and(eq(bookingsTable.type, "consultation"), gte(bookingsTable.scheduledDate, thirtyDaysAgoStr))),
    db.select({ tutoringCount: count() }).from(bookingsTable)
      .where(and(eq(bookingsTable.type, "tutoring"), gte(bookingsTable.scheduledDate, thirtyDaysAgoStr))),
    db.select({ outstandingFollowUps: count() }).from(leadsTable)
      .where(eq(leadsTable.stage, "Follow-Up")),
    db.select({ totalRevenue: sum(ordersTable.netAmountInCents) }).from(ordersTable)
      .where(gte(ordersTable.orderDate, thirtyDaysAgoStr)),
    db.select({ emailDeliveryRate: count() }).from(automationLogsTable)
      .where(eq(automationLogsTable.status, "delivered")),
  ]);

  // Simple conversion rate: Converted / (total non-closed)
  const [{ totalLeads }] = await db.select({ totalLeads: count() }).from(leadsTable);
  const [{ convertedLeads }] = await db.select({ convertedLeads: count() })
    .from(leadsTable).where(eq(leadsTable.stage, "Converted"));
  const [{ openLeads }] = await db.select({ openLeads: count() })
    .from(leadsTable).where(gte(leadsTable.createdAt, thirtyDaysAgo));

  const total = Number(totalLeads) || 1;
  const converted = Number(convertedLeads) || 0;

  res.json({
    newInquiries: Number(newInquiries),
    consultationsBooked: Number(consultationsBooked),
    tutoringSessionsThisMonth: Number(tutoringCount),
    conversionRate: Math.round((converted / total) * 100) / 100,
    bookSales: 0, // populated by real data when orders exist
    curriculumSales: 0,
    totalRevenue: Number(totalRevenue) || 0,
    outstandingFollowUps: Number(outstandingFollowUps),
    emailDeliveryRate: 0,
    openLeads: Number(openLeads),
  });
});

router.get("/admin/dashboard/trends", requireAdmin, async (req, res): Promise<void> => {
  const days = parseInt((req.query.days as string) || "30", 10);
  const from = new Date();
  from.setDate(from.getDate() - days);

  // Build daily arrays from DB
  const inquiries = await db.select().from(leadsTable)
    .where(gte(leadsTable.createdAt, from))
    .orderBy(leadsTable.createdAt);

  const bookings = await db.select().from(bookingsTable)
    .where(gte(bookingsTable.scheduledDate, from.toISOString().slice(0, 10)))
    .orderBy(bookingsTable.scheduledDate);

  const orders = await db.select().from(ordersTable)
    .where(gte(ordersTable.orderDate, from.toISOString().slice(0, 10)))
    .orderBy(ordersTable.orderDate);

  // Group by day
  const groupByDay = <T extends { createdAt?: Date | null; scheduledDate?: string | null; orderDate?: string | null }>(
    items: T[],
    getDay: (item: T) => string,
    getValue: (item: T) => number,
  ) => {
    const map: Record<string, number> = {};
    for (const item of items) {
      const day = getDay(item);
      if (day) map[day] = (map[day] || 0) + getValue(item);
    }
    return Object.entries(map).map(([date, value]) => ({ date, value })).sort((a, b) => a.date.localeCompare(b.date));
  };

  res.json({
    inquiriesByDay: groupByDay(inquiries, (i) => i.createdAt?.toISOString().slice(0, 10) ?? "", () => 1),
    bookingsByDay: groupByDay(bookings, (b) => b.scheduledDate ?? "", () => 1),
    revenueByDay: groupByDay(orders, (o) => o.orderDate ?? "", (o: any) => (o.netAmountInCents ?? 0) / 100),
  });
});

router.get("/admin/activity-feed", requireAdmin, async (req, res): Promise<void> => {
  const limit = parseInt((req.query.limit as string) || "20", 10);

  // Combine recent leads + bookings
  const [recentLeads, recentBookings] = await Promise.all([
    db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)).limit(limit / 2),
    db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt)).limit(limit / 2),
  ]);

  const feedItems = [
    ...recentLeads.map((l) => ({
      id: `lead-${l.id}`,
      type: "lead",
      description: `New inquiry from ${l.parentName} (${l.requestedService || "service unspecified"})`,
      entityType: "lead",
      entityId: l.id,
      createdAt: l.createdAt?.toISOString(),
    })),
    ...recentBookings.map((b) => ({
      id: `booking-${b.id}`,
      type: "booking",
      description: `${b.type} booking: ${b.parentName} on ${b.scheduledDate}`,
      entityType: "booking",
      entityId: b.id,
      createdAt: b.createdAt?.toISOString(),
    })),
  ].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")).slice(0, limit);

  res.json(feedItems);
});

export default router;
