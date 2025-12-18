import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { getUserNotifications } from "../services/notification.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";

const router = Router();

router.use(requireAuth);

router.get("/", async (req: AuthRequest, res: Response) => {
  const notifications = await getUserNotifications(req.userId!);
  res.json(notifications);
});

export default router;
