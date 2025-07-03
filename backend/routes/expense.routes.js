import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addExpense, deleteExpense, updateExpense, getExpenses } from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, addExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);


export default router;