// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// 🔹 Token шалгах middleware
const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "TOKEN_MISSING",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)
            .select("-password")
            .populate("studentProfile")
            .populate("supervisorProfile");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "USER_NOT_FOUND",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "TOKEN_EXPIRED",
            });
        }

        return res.status(401).json({
            success: false,
            message: "TOKEN_INVALID",
        });
    }
};

// 🔹 Role-аар эрх хязгаарлах middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res
                .status(401)
                .json({ success: false, message: "Not authorized" });
        }
        const hasRole = req.user.role.some((role) => roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You don't have permission",
            });
        }
        next();
    };
};

module.exports = {
    protect,
    authorize,
};
