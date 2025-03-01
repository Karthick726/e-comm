import React, { useEffect, useState, useContext,useRef  } from "react";
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
import { SlInfo } from "react-icons/sl";
import Footer from "../../../Common/Layout/Footer/Footer";

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
  const [isSticky, setIsSticky] = useState(true);

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

  //
 
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 500) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    console.log(isSticky)


  

  


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

  //details
  console.log("details",details)

  //similar filter

  const relatedProducts = products.filter(
    (product) => product.category === details?.category && product._id !== details?._id
  );


  //navigate
  const handleNavigate=(id)=>{
    navigate(`/product/${id}`)
  }
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
            <div className={`col-12 col-lg-4 image-single ${isSticky ? "sticky" : "static"}`} >
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

              <div className={`col-12 col-lg-6 image-singles`}>

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
                  <button className="buy-now" onClick={()=>{
                    navigate("/checkout",{
                      state:{
                        userCarts:details
                      }
                    })
                  }}>
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
                    <span className="offer">
                    {Math.round(details.percentage)}% Offer
                    <SlInfo style={{
                      fontSize: "17px",
                      color:"gray",
                      marginLeft:"10px"

                    }} />
                    </span>
                  </div>
                </div>
                <div class="rating">Free delivery</div>
                <div className="barnd">
                  <p><span>Brand Name :</span><span className="de"> {details.brandName}</span></p>
                  <p><span>Description :</span><span className="de"> {details.description}</span></p>
              
                  </div>
                </div>
                <div className="filter features">
                  <p>Features</p>
  {details.feature?.map((feature, index) => (
    <div key={index} className="feature-item">
      <span className="about-us-listicons">
        <svg
          aria-hidden="true"
          className="svg-inline--fa fa-check fa-w-14"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path>
        </svg>
      </span>
      <p>{feature}</p>
    </div>
  ))}
</div>
<div className="filter features">
                  <p>Specifications</p>
  {details.sepcification?.map((feature, index) => (
    <div key={index} className="feature-item">
      <span className="about-us-listicons">
        <svg
          aria-hidden="true"
          className="svg-inline--fa fa-check fa-w-14"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path>
        </svg>
      </span>
      <p>{feature}</p>
    </div>
  ))}
</div>
              </div>
            </div>
            <div
              className="col-lg-12 col-sm-12 col-12 "
              style={{
                backgroundColor: "white",
              }}
            >
               <div className="shopcart" style={{
                alignItems:"start"
               }}>
                <h5>
                 Similar Products
                </h5>
                
                        <div className="product-grid" style={{
                          width:"100%"
                        }}>
                          {relatedProducts.slice(0,3).map((value, index) => (
                            <div className="card" key={index}>
                              <div className="image-container" style={{
                                textAlign:"center"
                              }}>
                                <img src={value.image[0]} alt="Product Image" />
                                <div className="price">
                                  {Math.round(value.percentage)} % Offer
                                </div>
                              </div>
                              <label className={`favorite `}>
                                <FaHeart
                                  className={`fav-icons ${
                                    wishList?.wishlist.wishlist.some(
                                      (item) => item.ProductId === value._id
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => handleaddWishList(value._id)}
                                />
                                {/* <input  type="checkbox"  onClick={()=>handleaddWishList(value._id)}/>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                                <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
                              </svg> */}
                              </label>
                              <div className="content">
                                <div className="brand">{value.brandName}</div>
                                <div className="product-name mt-2">
                                  {value.productName.slice(0, 90)}...
                                </div>
                                <div className="color-size-container">
                                  <div class="offer-price ">
                                    ₹ {value.offerPrice}
                                    <span className="original-price">
                                      {" "}
                                      ₹ {value.originalPrice}
                                    </span>
                                  </div>
                                </div>
                                <div class="rating">Free delivery</div>
                              </div>
                              <div className="button-container">
                                <button className="buy-button button" onClick={()=>handleNavigate(value._id)}>View Product</button>
                                <button
                                 disabled={addToCart?.addToCart?.some((item) => item.ProductId === value._id)}
                                  className={`cart-button button ${
                                    addToCart?.addToCart?.some(
                                      (item) => item.ProductId === value._id
                                    )
                                      ? "button-active"
                                      : ""
                                  }`}
                                  onClick={() => handleAddToCard(value._id)}
                                >
                                  <svg
                                    viewBox="0 0 27.97 25.074"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
                                      id="cart-shopping-solid"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
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
