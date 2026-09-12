import { Router } from "express";
import { createApiKey } from "../controllers/apiKey.controller";
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router();

router.post(
  "/",
  authMiddleware,
  createApiKey
);

export default router;