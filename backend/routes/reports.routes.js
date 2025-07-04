import express from "express";
import db from "../config/sqlite.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

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
        const reports = stmt.all(req.user._id.toString());
        res.json({ success: true, reports });
    } catch (err) {
        console.error("SQL Reports Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to load reports" });
    }
});

export default router;
