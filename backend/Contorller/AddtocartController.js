const addToCart = require("../Schema/AddtocartSchema");

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