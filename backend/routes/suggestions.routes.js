import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getSmartSuggestions } from "../controllers/suggestions.controller.js";


const router = express.Router();

router.get("/", authMiddleware, getSmartSuggestions);


export default router;