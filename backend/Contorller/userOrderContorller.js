const orderModel=require("../Schema/orderSchema")



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


