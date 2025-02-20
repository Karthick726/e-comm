const express=require("express");
const { VerifyToken } = require("./VerifyToken/VerifyToken");
const { postOrder } = require("../Contorller/userOrderContorller");

const router=express.Router();


router.post("/add-order",VerifyToken,postOrder);






module.exports=router;