import User from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/auth.js";

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const user = await User.create({ name, email, password });

        await generateTokenAndSetCookies(user, res);

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: { _id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        console.error("Signup Error:", error.message);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(", "), success: false });
        }
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) return res.status(400).json({ success: false, message: "Inavlid Password" });

        await generateTokenAndSetCookies(user, res);

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user: { _id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}