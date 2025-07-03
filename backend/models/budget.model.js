import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        enum: ["Food", "Rent", "Shopping", "Utilities", "Travel", "Other"],
        required: true,
    },
    month: {
        type: String, // format: "2025-07"
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    }
}, { timestamps: true });


const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;