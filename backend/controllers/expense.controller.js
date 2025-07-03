import Expense from "../models/expense.model.js";


export const addExpense = async (req, res) => {
    try {
        const { amount, category, paymentMethod, notes } = req.body;
        const userId = req.user._id; //this we will get because of authMiddleware
        if (!amount || !category || !paymentMethod) {
            return res.status(400).json({ message: "Required fields missing", success: false });
        }

        const expense = new Expense.create({
            user: userId,
            amount,
            category,
            paymentMethod,
            notes
        });

        return res.status(201).json({ message: "Expense added!", success: true, expense });
    } catch (error) {
        console.log(`Error in addExpense controller: `, error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {

    } catch (error) {

    }
}
export const getExpenses = async (req, res) => {
    try {

    } catch (error) {

    }
}