import express from "express";
import { getBudgetAlerts, getBudgets, setBudget } from "../controllers/budget.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",authMiddleware, setBudget);
router.get("/",authMiddleware, getBudgets);
router.get("/alerts",authMiddleware, getBudgetAlerts);

export default router;