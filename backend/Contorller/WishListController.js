const WishList = require("../Schema/WishListSchema");

exports.addWishList = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    let userWishList = await WishList.findOne({ userId });

    if (userWishList) {
      const isAlreadyAdded = userWishList.wishlist.some(
        (item) => item.ProductId === id
      );

      if (!isAlreadyAdded) {
        userWishList.wishlist.push({ ProductId: id });
        await userWishList.save();
        return res.status(200).json({
          message: "Product added to wishlist",
          wishlist: userWishList,
        });
      } else {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
    } else {
      console.log("hii");

      const newuserWishList = new WishList({
        userId,
        wishlist: [{ ProductId: id }],
      });

      await newuserWishList.save();
      return res.status(201).json({
        message: "Wishlist created and product added",
        wishlist: newuserWishList,
      });
    }
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateWishList = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;
    console.log(id);
    let userWishList = await WishList.findOne({ userId });

    console.log(userWishList);

    if (userWishList) {
      const isAlreadyAdded = userWishList.wishlist.some(
        (item) => item.ProductId.toString() == id
      );

      console.log(isAlreadyAdded);
      if (isAlreadyAdded) {
        userWishList.wishlist = userWishList.wishlist.filter(
          (item) => item.ProductId.toString() !== id
        );
        const user = await userWishList.save();
        return res
          .status(200)
          .json({ message: "Product removed from wishlist", wishlist: user });
      } else {
        return res.status(400).json({ message: "Product not in wishlist" });
      }
    }
  } catch (err) {
    console.error("Error getting wishlist:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getWishList = async (req, res) => {
  console.log(req);
  try {
    const userId = req.user.id;
    const userWishList = await WishList.findOne({ userId });
    if (userWishList) {
      return res
        .status(200)
        .json({ message: "Wishlist retrieved", wishlist: userWishList });
    } else {
      return res.status(404).json({ message: "No wishlist found" });
    }
  } catch (err) {
    console.error("Error getting wishlist:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
