import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";


const router = express.Router();

router.get("/", authMiddleware, getDashboardData);


export default router;