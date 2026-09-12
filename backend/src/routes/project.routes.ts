import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router();

router.post(
  "/",
  authMiddleware,
  createProject
);

export default router;