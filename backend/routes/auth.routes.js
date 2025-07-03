import express from "express";
import { getUser, loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//GET request to get the user
router.get("/", authMiddleware, getUser);

//POST routes for user authentication
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;