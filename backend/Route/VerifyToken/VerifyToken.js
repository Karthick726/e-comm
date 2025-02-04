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

module.exports = VerifyToken;
