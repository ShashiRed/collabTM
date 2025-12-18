import { Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth);

router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
