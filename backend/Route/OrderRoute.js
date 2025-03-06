const express=require("express");
const { VerifyToken,authorize } = require("./VerifyToken/VerifyToken");
const { postOrder, getOrder, cancleOrder, getFullOrder,updateuserStatus } = require("../Contorller/userOrderContorller");

const router=express.Router();


router.post("/add-order",VerifyToken,postOrder);

router.post("/cancel-order",VerifyToken,cancleOrder);

router.get("/get-userorder",VerifyToken,getOrder);


router.get("/get-fullorder",VerifyToken,authorize(["admin"]),getFullOrder)

router.post("/submit",VerifyToken,authorize(["admin"]),updateuserStatus)


module.exports=router;