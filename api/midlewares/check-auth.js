const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.headers.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
