const express = require("express");
const router = express.Router();
const user=require('../Contorller/userLoginController');
const VerifyToken = require("./VerifyToken/VerifyToken");


router.post('/login',user.userLogin);

router.post('/signup',user.userSignup);

router.post('/otp',user.adduser);

router.post('/resendotp',user.resendOtp);

router.post("/forgetpassword",user.forgetPassword)

router.get("/get-user",VerifyToken,user.getUser);

router.post("/update-profile",VerifyToken,user.updateProfile)




module.exports = router;