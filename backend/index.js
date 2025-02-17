const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


// //Import Route
const userSignup=require("./Route/userLoginRoute")
const contact=require("./Route/adminContactRoute")
const product=require("./Route/productRoute")
const wishList=require("./Route/WishListRoute")
const addtocart=require("./Route/AddtocartRoute")

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3000','https://e-comm-frontend-ashy.vercel.app'], // Add allowed origins here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));    
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.use("/user",userSignup)
app.use("/contact",contact)
app.use("/product",product)
app.use("/wishlist",wishList)
app.use("/addtocart",addtocart)




const mongo_url =
  "mongodb+srv://karthickc726:Karthick992003@cluster0.fu6mk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("db connect");
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error:" + error);
  });
