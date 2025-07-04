import db from "../config/sqlite.js";

export const saveMonthlyReport = ({ userId, month, totalSpent, topCategory, overbudgetCategories }) => {
    const stmt = db.prepare(`
    INSERT INTO monthly_reports (userId, month, totalSpent, topCategory, overbudgetCategories)
    VALUES (?, ?, ?, ?, ?)
  `);

    stmt.run(
        userId.toString(),
        month,
        totalSpent,
        topCategory,
        JSON.stringify(overbudgetCategories || [])
    );
};
