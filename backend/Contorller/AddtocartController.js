const addToCart = require("../Schema/AddtocartSchema");
const mongoose=require("mongoose")

exports.postAddToCard = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;


    console.log("userId", userId,"ProductId" ,id)

    let alreadyUser = await addToCart.findOne({ userId });

    console.log(alreadyUser)

    if (alreadyUser) {
      const alreadyProduct = alreadyUser.addToCart.find(
        (value) => value.ProductId.toString() === id
      );

      console.log(alreadyUser)

      if (alreadyProduct) {
        alreadyProduct.quantity += 1;
      } else {
        alreadyUser.addToCart.push({
          ProductId :id,
          quantity: 1,
        });
      }

      await alreadyUser.save();

      res.status(200).json({
        message: "Product successfully added in cart",
      });


    } else {
        console.log("hii")
      const newUser = new addToCart({
        userId,
        addToCart: [
          {
            ProductId :id,
            quantity: 1,
          },
        ],
      });
  

      

      await newUser.save()
      res.status(200).json({
        message: "Product successfully added in cart",
      });
    }

   
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateAddToCart=async(req,res)=>{
  try {
    const { id } = req.body;
    const userId = req.user.id;



    let alreadyUser = await addToCart.findOne({ userId });


    if (alreadyUser) {
      const alreadyProduct = alreadyUser.addToCart.find(
        (value) => value.ProductId.toString() === id
      );

      if (alreadyProduct) {
        alreadyProduct.quantity -= 1;
      } 

      await alreadyUser.save();

      res.status(200).json({
        message: "Product successfully added in cart",
      });


    } 

      

    
   
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
}

exports.getAddToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = await addToCart.findOne({ userId });

    if (userCart) {
        return res
          .status(200)
          .json({ message: "Card retrieved", cart: userCart });
      } else {
        return res.status(404).json({ message: "No Cart found" });
      }
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
}


exports.getUserCart=async(req,res)=>{
   try {
      const userId = req.user.id;
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const userCart = await addToCart.findOne({ userId });
  
      if (!userCart) {
        return res.status(404).json({ message: "userCart not found" });
      }

      const cartProducts = await addToCart.aggregate([
        {
          $match: {
            userId: userObjectId,
          }
        },
        {
          $unwind:"$addToCart"
        },
        {
          $lookup:{
            from: 'products',
            localField: 'addToCart.ProductId',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $unwind: "$product"
        },
        {
          $project:{
            _id: 0,
            userId: 0,
          __v:0
          
          }
        }
      ])


      console.log(cartProducts);

      return res
        .status(200)
        .json({ message: "Cart user", cart: cartProducts });

    }catch(err){
      console.log(err)
      res.status(500).json({ message: "Server Error" });
    }
}

exports.deleteCart=async(req,res)=>{
  try{
    const { id } = req.body;
    const userId = req.user.id;



    let userCart = await addToCart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    userCart.addToCart = userCart.addToCart.filter(
      (item) => item.ProductId.toString() !== id
    );

    await userCart.save();
    return res.status(200).json({ message: "Product removed from cart" });

  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
}


exports.deleteWholeCart=async(req,res)=>{
  try{
    const userId = req.user.id;
    let userCart = await addToCart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });  
  }
  userCart.addToCart=[];
  await userCart.save();
  return res.status(200).json({ message: "Cart cleared" });
}catch(Err){
  console.log(Err)
  res.status(500).json({ message: "Server Error" });
}
}