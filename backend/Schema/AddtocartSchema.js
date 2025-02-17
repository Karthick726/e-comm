const mongoose = require("mongoose");

const Addtocart=new mongoose.Schema({

        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true
        },
        addToCart:{
            type:[{
                ProductId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    required:true
                    },
                    quantity:{
                        type:Number,
                        required:true,
                        default:1
                    }
            }],
           
            }

})


module.exports=mongoose.model("addtocarts",Addtocart)