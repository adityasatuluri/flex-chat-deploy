import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaUBvdXRsb29rLmNvbSIsInVzZXJJZCI6IjY3M2M5MGRlZjY5YTVkZGE5NjBmNTY0NyIsImlhdCI6MTczMjA4MjM3NSwiZXhwIjoxOTkxMjgyMzc1fQ.RiEqyyuzGaI4-t-929wTkwRXX0KwFKBD6zw_pGEZamo";
  // req.userId = decoded.userId;
  // next();

  console.log("Token:", token);
  console.log("Cookies:", req.cookies);

  if (!token) {
    return res.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).send("Token is not valid!");
    }
    req.userId = decoded.userId;
    next();
  });
};
