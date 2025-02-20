const express=require("express");
const { VerifyToken } = require("./VerifyToken/VerifyToken");
const { postAddToCard, getAddToCart, getUserCart, updateAddToCart, deleteCart,deleteWholeCart } = require("../Contorller/AddtocartController");
const router=express.Router()


router.post('/post-addtocart',VerifyToken,postAddToCard)

router.post('/update-addtocart',VerifyToken,updateAddToCart)

router.post('/deleteAddtocart',VerifyToken,deleteCart)

router.post('/deleteWholeAddtocart',VerifyToken,deleteWholeCart)

router.get('/get-addtocart',VerifyToken,getAddToCart)

router.get('/get-usercart',VerifyToken,getUserCart)



module.exports=router;