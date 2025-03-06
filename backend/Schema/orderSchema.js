const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  orderItems: [
    {
      ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
      },
      cancelDetails:{
        reason:{
          type:String

        },
        date:{
          type:Date
        },
        message:{
          type:String
        }

      },
      address: {
        type: String,
        required: true,
      },
      trackId:{
        type:String
      },
      placedAt: { type: Date, default: Date.now },
    },
  ],
},
{ timestamps: true }

);


module.exports = mongoose.model("Orders", orderModel);