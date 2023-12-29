const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401); // No token found

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded token to the request
    next();
  } catch (error) {
    return res.sendStatus(403); // Invalid token
  }
};

module.exports = authenticateToken;
