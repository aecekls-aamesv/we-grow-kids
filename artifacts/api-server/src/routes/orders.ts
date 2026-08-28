import { Router, type IRouter } from "express";
import { db, ordersTable, productsTable } from "@workspace/db";
import { eq, and, gte, lte, desc, count, sum } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/orders/summary", requireAdmin, async (req, res): Promise<void> => {
  const { startDate, endDate } = req.query as Record<string, string>;
  let conditions: any[] = [];
  if (startDate) conditions.push(gte(ordersTable.orderDate, startDate));
  if (endDate) conditions.push(lte(ordersTable.orderDate, endDate));
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [summary] = await db.select({
    totalRevenue: sum(ordersTable.netAmountInCents),
    totalOrders: count(),
  }).from(ordersTable).where(whereClause);

  // Book vs curriculum breakdown
  const bookOrders = await db.select({
    revenue: sum(ordersTable.netAmountInCents),
    count: count(),
  }).from(ordersTable)
    .innerJoin(productsTable, eq(ordersTable.productId, productsTable.id))
    .where(and(whereClause, eq(productsTable.type, "book")));

  const curriculumOrders = await db.select({
    revenue: sum(ordersTable.netAmountInCents),
    count: count(),
  }).from(ordersTable)
    .innerJoin(productsTable, eq(ordersTable.productId, productsTable.id))
    .where(and(whereClause, eq(productsTable.type, "curriculum")));

  const total = Number(summary?.totalOrders ?? 0);
  const totalRev = Number(summary?.totalRevenue ?? 0);
  res.json({
    totalRevenue: totalRev,
    totalOrders: total,
    bookRevenue: Number(bookOrders[0]?.revenue ?? 0),
    curriculumRevenue: Number(curriculumOrders[0]?.revenue ?? 0),
    averageOrderValue: total > 0 ? Math.round(totalRev / total) : 0,
  });
});

router.get("/orders", requireAdmin, async (req, res): Promise<void> => {
  const { startDate, endDate, productId, paymentStatus } = req.query as Record<string, string>;
  let conditions: any[] = [];
  if (startDate) conditions.push(gte(ordersTable.orderDate, startDate));
  if (endDate) conditions.push(lte(ordersTable.orderDate, endDate));
  if (productId) conditions.push(eq(ordersTable.productId, parseInt(productId, 10)));
  if (paymentStatus) conditions.push(eq(ordersTable.paymentStatus, paymentStatus));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  const [orders, [{ value: total }]] = await Promise.all([
    db.select().from(ordersTable)
      .where(whereClause)
      .orderBy(desc(ordersTable.createdAt)),
    db.select({ value: count() }).from(ordersTable).where(whereClause),
  ]);
  res.json({ orders, total: Number(total) });
});

router.post("/orders", requireAdmin, async (req, res): Promise<void> => {
  const {
    productId, leadId, buyerName, buyerEmail, quantity = 1,
    grossAmountInCents = 0, discountAmountInCents = 0, refundAmountInCents = 0,
    netAmountInCents = 0, paymentStatus = "pending", fulfillmentStatus = "unfulfilled",
    source = "manual", notes, orderDate,
  } = req.body;
  if (!buyerName || !buyerEmail || !orderDate) {
    res.status(400).json({ error: "buyerName, buyerEmail, and orderDate are required" }); return;
  }
  const [order] = await db.insert(ordersTable).values({
    productId, leadId, buyerName, buyerEmail, quantity,
    grossAmountInCents, discountAmountInCents, refundAmountInCents,
    netAmountInCents, paymentStatus, fulfillmentStatus, source,
    notes, orderDate, dataSource: "manual",
  }).returning();
  res.status(201).json(order);
});

router.patch("/orders/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowed = ["paymentStatus","fulfillmentStatus","notes","refundAmountInCents","netAmountInCents"];
  const updates: Record<string, any> = {};
  for (const f of allowed) { if (req.body[f] !== undefined) updates[f] = req.body[f]; }

  const [order] = await db.update(ordersTable).set(updates)
    .where(eq(ordersTable.id, id)).returning();
  if (!order) { res.status(404).json({ error: "Not found" }); return; }
  res.json(order);
});

export default router;
