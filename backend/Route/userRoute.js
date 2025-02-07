const express = require("express");


const { VerifyToken, authorize } = require("./VerifyToken/VerifyToken");

const router = express.Router();


router.get("/profile", VerifyToken, (req, res) => {
  res.json({ message: "User Profile"});
});

router.get("/admin", VerifyToken, authorize(["admin"]), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

module.exports = router;
