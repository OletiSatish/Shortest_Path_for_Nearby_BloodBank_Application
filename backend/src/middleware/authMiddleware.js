const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.warn("Authentication failed: No token provided.");
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);

    // Find the user based on the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      console.warn(`Authentication failed: User with ID ${decoded.id} not found.`);
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for use in subsequent middlewares/routes
    req.user = user;
    console.log(`User authenticated successfully: ${user.username} (${user.role})`);
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

/**
 * Authorization middleware to check if the authenticated user has one of the required roles.
 * The roles are passed as an array to the middleware.
 */
const authorize = (roles) => {
  return (req, res, next) => {
    try {
      // Ensure the `authenticate` middleware has populated `req.user`
      if (!req.user) {
        console.error("Authorization error: User not authenticated.");
        return res.status(500).json({ message: "User not authenticated" });
      }

      console.log(`User role: ${req.user.role}, Required roles: ${roles}`);
      // Check if the user's role is included in the required roles
      if (!roles.includes(req.user.role)) {
        console.warn(
          `Access forbidden: User role '${req.user.role}' is not authorized for this action.`
        );
        return res
          .status(403)
          .json({ message: "Access forbidden: insufficient rights" });
      }

      console.log("Authorization successful.");
      next();
    } catch (error) {
      console.error("Authorization error:", error.message);
      res.status(500).json({ message: "Server error during authorization" });
    }
  };
};

module.exports = { authenticate, authorize };
