import Budget from "../models/budget.model.js";
import Expense from "../models/expense.model.js";

export const setBudget = async (req, res) => {
    try {
        const { category, month, limit } = req.body;
        if (!category || !month || !limit) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existing = await Budget.findOne({ user: req.user._id, category, month });
        let budget;

        if (existing) {
            existing.limit = limit;
            budget = await existing.save();
        } else {
            budget = await Budget.create({ user: req.user._id, category, month, limit });
        }

        return res.status(200).json({ success: true, budget });

    } catch (error) {
        console.error("Set Budget Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id });
        return res.status(200).json({ success: true, budgets });
    } catch (error) {
        console.error("Get Budgets Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getBudgetAlerts = async (req, res) => {
    try {
        const userId = req.user._id;
        const today = new Date();
        const monthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

        const budgets = await Budget.find({ user: userId, month: monthKey });

        const expenses = await Expense.find({
            user: userId,
            date: {
                $gte: new Date(`${monthKey}-01T00:00:00Z`),
                $lte: new Date(`${monthKey}-31T23:59:59Z`)
            }
        });

        const categoryTotals = {};

        for (let exp of expenses) {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        }

        const alerts = budgets.map(budget => {
            const spent = categoryTotals[budget.category] || 0;
            const percent = (spent / budget.limit) * 100;

            let status = "OK";
            if (percent >= 100) status = "Overbudget";
            else if (percent >= 80) status = "Warning";

            return {
                category: budget.category,
                limit: budget.limit,
                spent,
                status,
                percent: +percent.toFixed(1)
            };
        });

        res.status(200).json({ success: true, alerts });
    } catch (err) {
        console.error("Alert Fetch Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
