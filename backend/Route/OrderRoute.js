const express=require("express");
const { VerifyToken } = require("./VerifyToken/VerifyToken");
const { postOrder, getOrder, cancleOrder } = require("../Contorller/userOrderContorller");

const router=express.Router();


router.post("/add-order",VerifyToken,postOrder);

router.post("/cancel-order",VerifyToken,cancleOrder);

router.get("/get-userorder",VerifyToken,getOrder);






module.exports=router;