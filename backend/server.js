import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import { connectToDB } from "./config/connectToDB.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import suggestionRoutes from "./routes/suggestions.routes.js";
import reportRoutes from "./routes/reports.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://personal-finance-tracker-liard.vercel.app" || "http://localhost:5173", 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
})