const mongoose = require("mongoose");



const wishList=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    wishlist:{
        type:[{
            ProductId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                },
        }],
       
        }
})

module.exports=mongoose.model("wishlist",wishList)