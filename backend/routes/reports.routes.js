import express from "express";
import db from "../config/sqlite.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { saveMonthlyReport } from "../utils/saveMonthlyReport.js";

const router = express.Router();

// Get last 3 reports for logged-in user
router.get("/", authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare(`
      SELECT * FROM monthly_reports
      WHERE userId = ?
      ORDER BY createdAt DESC
      LIMIT 3
    `);
        const rows = stmt.all(req.user._id.toString());

        // Parse overbudgetCategories JSON string into array
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


// TEMP ROUTE: Generate a sample monthly report
router.post("/generate", authMiddleware, (req, res) => {
    try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        saveMonthlyReport({
            userId: req.user._id,
            month,
            totalSpent: 10500,
            topCategory: "Food",
            overbudgetCategories: ["Food", "Shopping"]
        });

        res.status(200).json({ success: true, message: "Monthly report saved to SQL." });
    } catch (error) {
        console.error("Insert SQL Error:", error.message);
        res.status(500).json({ success: false, message: "Error inserting monthly report" });
    }
});


export default router;
