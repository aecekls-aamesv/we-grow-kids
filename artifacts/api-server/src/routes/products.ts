import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.get("/products", requireAdmin, async (req, res): Promise<void> => {
  const products = await db.select().from(productsTable)
    .orderBy(productsTable.name);
  res.json(products);
});

router.post("/products", requireAdmin, async (req, res): Promise<void> => {
  const { name, type, sku, description, priceInCents = 0, active = "true" } = req.body;
  if (!name || !type) { res.status(400).json({ error: "name and type are required" }); return; }
  const [product] = await db.insert(productsTable)
    .values({ name, type, sku, description, priceInCents, active })
    .returning();
  res.status(201).json(product);
});

router.patch("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const allowed = ["name","type","sku","description","priceInCents","active"];
  const updates: Record<string, any> = {};
  for (const f of allowed) { if (req.body[f] !== undefined) updates[f] = req.body[f]; }

  const [product] = await db.update(productsTable).set(updates)
    .where(eq(productsTable.id, id)).returning();
  if (!product) { res.status(404).json({ error: "Not found" }); return; }
  res.json(product);
});

export default router;
