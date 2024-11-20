import jwt from "jsonwebtoken";

/**
 * Middleware to verify the JWT token from cookies.
 * Ensures the user is authenticated before proceeding.
 */
export const verifyToken = (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.jwt;

    console.log("Received Token:", token); // Debugging: Log the token
    console.log("Incoming Cookies:", req.cookies); // Debugging: Log all cookies

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err); // Debugging: Log error
        return res.status(403).json({ message: "Token is not valid!" });
      }

      // Attach user information to the request object
      req.userId = decoded.userId;
      console.log("Decoded User ID:", req.userId); // Debugging: Log decoded user ID

      // Proceed to the next middleware or route
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error); // Debugging: Log unexpected errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};
