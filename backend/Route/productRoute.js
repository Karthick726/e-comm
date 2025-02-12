const express=require("express");
const router=express.Router();
const product=require("../Contorller/productController");

const upload = require("../cloundinary/upload");
const { VerifyToken, authorize } = require("./VerifyToken/VerifyToken");


router.post("/add-product",VerifyToken,authorize(["admin"]),upload.array("images",10),product.addProducts);

router.get("/get-products",product.getProducts)


module.exports=router;