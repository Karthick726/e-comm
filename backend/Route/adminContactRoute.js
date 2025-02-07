const express = require("express");
const router = express.Router();
const contact=require('../Contorller/AdminContactController');

const {VerifyToken,authorize} = require("./VerifyToken/VerifyToken");

router.post('/save-contact',VerifyToken,authorize(["admin"]),contact.postContact);

router.get('/get-contact',contact.getContact);


module.exports = router;