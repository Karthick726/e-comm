const express=require("express");
const { addWishList, getWishList, updateWishList } = require("../Contorller/WishListController");
const { VerifyToken } = require("./VerifyToken/VerifyToken");

const router=express.Router();


router.post("/add-wishlist",VerifyToken,addWishList);

router.post("/delete-wishlist",VerifyToken,updateWishList);


router.get("/get-wishlist",VerifyToken,getWishList);





module.exports=router;