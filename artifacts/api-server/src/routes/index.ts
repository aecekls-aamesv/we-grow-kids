import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import leadsRouter from "./leads";
import bookingsRouter from "./bookings";
import availabilityRouter from "./availability";
import automationsRouter from "./automations";
import integrationsRouter from "./integrations";
import productsRouter from "./products";
import ordersRouter from "./orders";
import socialRouter from "./social";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(leadsRouter);
router.use(bookingsRouter);
router.use(availabilityRouter);
router.use(automationsRouter);
router.use(integrationsRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(socialRouter);
router.use(dashboardRouter);

export default router;
