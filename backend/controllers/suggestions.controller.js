import Expense from "../models/expense.model.js";

export const getSmartSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const last30Days = new Date(now.setDate(now.getDate() - 30));

        //found the expenses in the last 30 days that user made
        const expenses = await Expense.find({
            user: userId,
            date: { $gte: last30Days }
        });

        if (!expenses.length) {
            return res.status(200).json({
                success: true,
                suggestions: ["You have no expenses in the last 30 days."]
                //sending the suggestion that no expense
            });
        }

        const suggestions = [];

        // 1. Top spending category
        const categoryTotals = {};
        for (const exp of expenses) {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        }

        for (const exp of expenses) {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        }

        const sortedCategories = Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1]);

        if (sortedCategories.length) {
            const [topCategory, total] = sortedCategories[0];
            suggestions.push(`You're spending a lot on ${topCategory}. Try to reduce it by 15%.`);
        }

        // 2. Spike in recent spending (compare last 15 days vs previous 15 days)
        const midDate = new Date();
        midDate.setDate(midDate.getDate() - 15);

        const early = {};
        const recent = {};

        for (const exp of expenses) {
            const bucket = exp.date < midDate ? early : recent;
            bucket[exp.category] = (bucket[exp.category] || 0) + exp.amount;
        }

        for (const cat in recent) {
            if (early[cat] && early[cat] > 0) {
                const percentIncrease = ((recent[cat] - early[cat]) / early[cat]) * 100;
                if (percentIncrease > 50) {
                    suggestions.push(`Your ${cat} expenses increased a lot this month.`);
                }
            }
        }

        return res.status(200).json({ success: true, suggestions });

    } catch (error) {
        console.error("Smart Suggestions Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
