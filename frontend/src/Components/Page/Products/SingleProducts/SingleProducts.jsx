import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../Common/Layout/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../../../redux/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { UserContext } from "../../Home/UserLogin/UserContext";
import { addToCartPost } from "../../../redux/addtoCardSlice";
import { FaHeart } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import {
  deleteWishList,
  fetchWishList,
  updateWishList,
} from "../../../redux/wishList";

const SingleProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const { userDetails } = useContext(UserContext);
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.products);
  const { addToCart } = useSelector((state) => state.addToCart);

  // Fetch products only if they are empty
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Check if product exists and set details
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === id);

      if (!product) {
        navigate("/");
      } else {
        setDetails(product);
        setSelectedImage(product.image[0]);
      }
    }
  }, [id, products, navigate]);

  // add to card

  const handleAddToCard = async (id) => {
    console.log(id);
    if (userDetails === null) {
      navigate("/account");
    } else {
      try {
        const response = await dispatch(addToCartPost(id));
        console.log(response);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  //wishlist

  const handleaddWishList = async (id) => {
    if (userDetails === null) {
      navigate("/account");
    } else if (
      wishList?.wishlist.wishlist.some((item) => item.ProductId === id)
    ) {
      try {
        const response = await dispatch(deleteWishList(id));
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await dispatch(updateWishList(id));
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Header />

      {details ? (
        <div className="container con">
          <div className="row rows">
            <div
              className="col-lg-12 col-sm-12 col-12 "
              style={{
                backgroundColor: "white",
              }}
            >
              <div className="shopcart">
                <h5>
                  Welcome to ShopCart – Your One-Stop Destination for
                  Cutting-Edge Tech Gadgets!
                </h5>
                <p>
                  At ShopCart, we bring you the latest and greatest in
                  technology. Whether you're looking for a high-performance
                  smartphone, immersive earbuds, or a powerful laptop, we’ve got
                  it all. Explore our premium range of gadgets designed to
                  enhance your digital lifestyle with innovation, style, and
                  functionality.
                </p>
                <p>
                  Whether you’re looking for a powerful smartphone, immersive
                  earbuds, a high-performance laptop, or essential accessories
                  like chargers, we’ve got everything you need in one place. Our
                  collection is designed to provide cutting-edge performance,
                  style, and convenience, ensuring you stay ahead in today’s
                  fast-paced digital world.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-4 image-single">
              <div className="col-12 col-lg-2 thumbnails">
                {details.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail-img ${
                      selectedImage === img ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              <div className="col-12 col-lg-6 image-singles">
                <div
                  style={{
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid lightgray",
                    textAlign: "center",
                  }}
                >
                  <label className={`favorite `}>
                    <FaHeart
                      className={`fav-icons ${
                        wishList?.wishlist.wishlist.some(
                          (item) => item.ProductId === details._id
                        )
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleaddWishList(details._id)}
                    />
                  </label>
                </div>
                <img
                  src={selectedImage}
                  alt="Main Product"
                  className="main-image"
                />

                <div className="buttons">
                  <button
                    disabled={addToCart?.addToCart?.some(
                      (item) => item.ProductId === details._id
                    )}
                    className={`add-to-cart ${
                      addToCart?.addToCart?.some(
                        (item) => item.ProductId === details._id
                      )
                        ? "button-active"
                        : ""
                    }`}
                    onClick={() => handleAddToCard(details._id)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="buy-now">
                    <BsLightningFill /> Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7 content-single">
              <div className="content-about-products">
                <div
                  className="filter"
                  style={{
                    padding: "20px 20px 10px 20px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "start",
                      fontWeight: "normal",
                      fontSize: "12px",
                    }}

                  >
                    Home{" "}
                    <FaGreaterThan
                      style={{
                        textAlign: "start",
                        fontWeight: "normal",
                        fontSize: "9px",
                      }}
                    />{" "}
                    Products
                    <FaGreaterThan
                      style={{
                        textAlign: "start",
                        fontWeight: "normal",
                        fontSize: "9px",
                      }}
                    />
                    {details.brandName}
                  </p>
                </div>
                <div className="filter active-products">
                  <p>{details.productName}</p>
                  <div className="color-size-container mt-3">
                  <div class="offer-prices ">
                    ₹ {details.offerPrice}
                    <span className="original-prices">
                      {" "}
                      ₹ {details.originalPrice}
                    </span>
                  </div>
                </div>
                <div class="rating">Free delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default SingleProducts;
