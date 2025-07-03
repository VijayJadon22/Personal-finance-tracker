import Budget from "../models/budget.model.js";

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

    } catch (error) {

    }
}