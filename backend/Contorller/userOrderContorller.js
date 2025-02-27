const orderModel=require("../Schema/orderSchema")
const mongoose = require("mongoose");


exports.postOrder=async(req,res)=>{
try{
    const userId = req.user.id; 
    const {formDatas}=req.body;

    const alreadyUser=await orderModel.findOne({userId})

    const products = Array.isArray(formDatas.productId) ? formDatas.productId : [formDatas.productId];
    const quantities = Array.isArray(formDatas.quantity) ? formDatas.quantity : [formDatas.quantity];
    const prices = Array.isArray(formDatas.totalPrice) ? formDatas.totalPrice : [formDatas.totalPrice];

    console.log(products,quantities,prices)

    const newOrderItems = products.map((id, index) => ({
        ProductId: id,
        quantity: quantities[index],
        price: prices[index],
        orderStatus: "Processing",
        address: formDatas.address,
        placedAt: new Date(),
      }));


      if (alreadyUser) {
        alreadyUser.orderItems.push(...newOrderItems);
        await alreadyUser.save();
        return res.status(200).json({
          message: "Order updated with new products",
          order: alreadyUser,
        });
      } else {
        const newOrder = new orderModel({
          userId,
          orderItems: newOrderItems,
        });
  
        await newOrder.save();
  
        return res.status(200).json({
          message: "New order created successfully",
          order: newOrder,
        });
      }

}catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error" });
}
}

exports.getOrder=async(req,res)=>{

  try{
    console.log("hii")
    const userId=req.user.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);
    const order=await orderModel.findOne({userId})
    
    if(!order){
      return res.status(404).json({ message: "User order not found" });
    }


    const userOrder=await orderModel.aggregate([
      {
        $match:{
          userId:userObjectId
        }
      },
      {
        $unwind:"$orderItems"
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.ProductId",
          foreignField: "_id",
          as: "product_Info",
        },
      },
      {
        $unwind:"$product_Info"
      }
     
    ])
    return res
    .status(200)
    .json({ message: "User order retrieved", Order: userOrder });



  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
  
}

exports.cancleOrder=async(req,res)=>{
  try{
    const userId=req.user.id;
    const {cancelData}=req.body
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const order=await orderModel.findOne({userId})
    if(!order){
      return res.status(404).json({ message: "User order not found" });
      }


    const productFind=  await order.orderItems.find((value)=> value._id.toString() ===cancelData._id)

    productFind.cancelDetails={
      reason:cancelData.reason,
      date:Date.now(),
      message:cancelData.message
    }

    productFind.orderStatus="Cancelled"


  const newuser = await order.save()
  
  res.status(200).json({
    message: "Order cancelled successfully",
  })

  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
}




