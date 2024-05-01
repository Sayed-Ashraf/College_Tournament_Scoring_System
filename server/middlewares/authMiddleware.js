const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['x-access-token'];

  if (!authHeader) {
     res.status(401).json({ error: "Unauthorized - Missing authorization header" });
  }

  const token = authHeader;

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      where: { email: decodedToken.email },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.role = user.role;
    req.inTeam = user.inTeam;

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else {
      console.error("Error verifying token:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = authMiddleware;
