import express from "express";
import db from "../config/sqlite.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { saveMonthlyReport } from "../utils/saveMonthlyReport.js";
import Expense from "../models/expense.model.js";
import Budget from "../models/budget.model.js";

const router = express.Router();

//GET: Last 3 reports
router.get("/", authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare(`
      SELECT * FROM monthly_reports
      WHERE userId = ?
      ORDER BY createdAt DESC
      LIMIT 3
    `);
        const rows = stmt.all(req.user._id.toString());

        const reports = rows.map((row) => ({
            ...row,
            overbudgetCategories: JSON.parse(row.overbudgetCategories || "[]"),
        }));

        res.json({ success: true, reports });
    } catch (error) {
        console.error("SQL Reports Error:", error.message);
        res.status(500).json({ success: false, message: "Failed to load reports" });
    }
});

// Generate this month's report
router.post("/generate", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        const expenses = await Expense.find({
            user: userId,
            date: {
                $gte: new Date(`${monthKey}-01T00:00:00Z`),
                $lte: new Date(`${monthKey}-31T23:59:59Z`),
            },
        });

        if (expenses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No expenses found for this month.",
            });
        }

        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const categoryTotals = {};
        for (let exp of expenses) {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        }

        const topCategory =
            Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0];

        const budgets = await Budget.find({ user: userId, month: monthKey });

        const overbudgetCategories = [];
        for (let budget of budgets) {
            const spent = categoryTotals[budget.category] || 0;
            if (spent > budget.limit) {
                overbudgetCategories.push(budget.category);
            }
        }

        saveMonthlyReport({
            userId,
            month: monthKey,
            totalSpent,
            topCategory,
            overbudgetCategories,
        });

        return res.status(200).json({
            success: true,
            message: "Report generated dynamically.",
        });
    } catch (error) {
        console.error("Dynamic Report Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while generating report.",
        });
    }
});

export default router;
