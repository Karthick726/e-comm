const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
      user: "lingamkarthick89@gmail.com",
      pass: "urlx bbws veez kgnc",
    },
  });
  
module.exports=transporter;