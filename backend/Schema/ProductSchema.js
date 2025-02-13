const mongoose =require("mongoose")


const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    originalPrice:{
        type:String,
        required:true
    },
    offerPrice:{
        type:String,
    },
    image:{
        type:[String],
        required:true

    },
    description:{
        type:String,
        required:true
    },
    feature:{
        type:[String],
        required:true
    },
    sepcification:{
        type:[String],
        required:true
    },
    percentage:{
        type:String,
    },
    category:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("products",productSchema)