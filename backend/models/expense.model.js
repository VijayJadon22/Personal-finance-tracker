import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [1, "Amount must be a positive number"]
    },
    category: {
        type: String,
        enum: ["Food", "Rent", "Shopping", "Health", "Travel", "Other"],
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "Credit Card", "Cash", "Debit Card", "Net Banking", "Other"],
        required: true,
    },
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;