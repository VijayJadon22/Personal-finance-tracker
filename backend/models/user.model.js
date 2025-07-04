import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = function (userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

const User = mongoose.model("User", userSchema);
export default User;