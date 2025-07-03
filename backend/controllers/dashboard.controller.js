import Expense from "../models/expense.model.js"

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = Date.now();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        //get this month expenses
        const expenses = await Expense.find({
            user: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        //Total spent
        const totalSpent = expenses.reduce((total, exp) => total + exp.amount, 0);


        // Category totals
        const categoryTotals = {};
        const paymentMethodCounts = {};
        const dailySpending = {}; // for line graph


        for (const exp of expenses) {
            //category
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;

            //paymentMethod
            paymentMethodCounts[exp.paymentMethod] = (paymentMethodCounts[exp.paymentMethod] || 0) + 1;

            //Line graph by day
            // Line graph (group by day)
            const day = exp.date.toISOString().split("T")[0];
            dailySpending[day] = (dailySpending[day] || 0) + exp.amount;
        }

        // Top category
        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

        // Top 3 payment methods
        const topPaymentMethods = Object.entries(paymentMethodCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([method, count]) => ({ method, count }));

        // Line graph: Convert to array format
        const lineGraphData = Object.entries(dailySpending)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, amount]) => ({ date, amount }));

        // Pie chart: category-wise spending
        const pieChartData = Object.entries(categoryTotals).map(([category, amount]) => ({
            category,
            amount
        }));

        return res.status(200).json({
            success: true,
            totalSpent,
            topCategory,
            topPaymentMethods,
            pieChartData,
            lineGraphData
        });
    } catch (error) {
        console.error("Dashboard error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}