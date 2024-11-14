const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (roles) => async (req, res, next) => {
  try {
    // Get token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("[ERROR] No token provided");
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    // Decode and verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("[ERROR] Invalid token", error);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    // If no decoded data or invalid payload
    if (!decoded) {
      console.log("[ERROR] Invalid token payload");
      return res
        .status(401)
        .json({ message: "Not authorized, token missing or invalid" });
    }

    if (!decoded.id) {
      console.log("[ERROR] Missing user ID in token");
      return res
        .status(401)
        .json({ message: "Not authorized, invalid token payload" });
    }

    // Find user by ID from decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("[ERROR] User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;

    // Log the user details to verify the role (you can remove this in production)
    console.log("[INFO] User:", req.user);

    // Check if user role is authorized
    if (roles && !roles.includes(req.user.role.toLowerCase())) {
      console.log("[ERROR] Insufficient rights. User role:", req.user.role);
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("[ERROR] Authorization failed:", error.message);
    res
      .status(401)
      .json({ message: "Not authorized, token failed or expired" });
  }
};

module.exports = { protect };
