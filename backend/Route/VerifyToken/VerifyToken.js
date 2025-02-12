const secreteKey = "abcdef";
const User = require("../../Schema/userLogin");

const jwt = require("jsonwebtoken");

const VerifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  const role = req.cookies.role;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please log in to access this resource." });
  }

  try {
    const decoded = jwt.verify(token, secreteKey);
    const user = await User.findById(decoded.id);
    if (user.role !== role) {
      res.clearCookie("token");
      res.clearCookie("role");
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.clearCookie("role");
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.cookies.role)) {
      res.clearCookie("token");
      res.clearCookie("role");
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
  };
};

module.exports = {
  VerifyToken,
  authorize,
};
