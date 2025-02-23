
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SuperAdmin = require("../models/SuperAdmin");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user is a regular user or superadmin
            req.user = await User.findById(decoded.id) || await SuperAdmin.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Middleware to allow only SuperAdmin
const superAdminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "superadmin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. SuperAdmin only" });
    }
};

module.exports = { protect, superAdminOnly };
