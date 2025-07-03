import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(400).json({ message: "Unauthorized, No token found", success: false });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedData.userId).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}