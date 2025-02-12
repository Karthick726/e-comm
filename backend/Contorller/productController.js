const Product = require("../Schema/ProductSchema");
const cloudinary = require("../cloundinary/cloudinary");
const upload = require("../cloundinary/upload");

exports.addProducts = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const {
      productname,
      brandname,
      description,
      offerprice,
      originalprice,
      specification,
      feature,
    } = req.body;
    console.log(specification);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageString = image.buffer.toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${imageString}`,
          {
            folder: "Products",
            resource_type: "image",
          }
        );
        return result.secure_url;
      })
    );

    const percentage = ((originalprice - offerprice) / originalprice) * 100;

    const product = new Product({
      productName: productname,
      brandName: brandname,
      image: imageUrls,
      description,
      offerPrice: offerprice,
      originalPrice: originalprice,
      sepcification: specification,
      feature,
      percentage,
    });

    await product.save();
    res.status(200).json({
      message: "Product Added Successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getProducts=async(req,res)=>{
  try{
    const products=await Product.find()
    res.status(200).json(products)
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
