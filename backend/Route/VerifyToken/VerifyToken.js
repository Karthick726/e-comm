const secreteKey ="abcdef"

const jwt = require("jsonwebtoken");

const VerifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please log in to access this resource." });
  }

  try {
    const decoded = jwt.verify(token, secreteKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {

    if (!roles.includes(req.cookies.role)) {
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
  };
};

module.exports = {
  VerifyToken,
  authorize
};
