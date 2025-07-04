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

const allowedOrigins = [
  "http://localhost:5173",
  "https://personal-finance-tracker-liard.vercel.app",
  "https://personal-finance-git-91719f-vijay-pratap-singh-jadons-projects.vercel.app",
  "https://personal-finance-tracker-mw21u9hfs.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reports", reportRoutes);

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
})