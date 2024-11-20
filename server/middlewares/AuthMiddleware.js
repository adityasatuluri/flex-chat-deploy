import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // req.userId = decoded.userId;
  // next();

  console.log("Token:", token);
  console.log("Cookies:", req.cookies);

  if (!token) {
    req.userId = decoded.userId;
    next();
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
