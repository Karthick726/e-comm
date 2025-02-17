const express=require("express");
const { VerifyToken } = require("./VerifyToken/VerifyToken");
const { postAddToCard, getAddToCart } = require("../Contorller/AddtocartController");
const router=express.Router()


router.post('/post-addtocart',VerifyToken,postAddToCard)

router.get('/get-addtocart',VerifyToken,getAddToCart)



module.exports=router;