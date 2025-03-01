import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProducts } from "../../../redux/productSlice";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Mobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const laptops = products.filter((item) => item.category === "Smartphones & Tablets");

  const settings = {
    infinite: true,
  
    speed: 500,
    slidesToShow: 3, // Show 4 items at a time
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
    ],
  };


  const handleNavigate=(id)=>{
    navigate(`/product/${id}`);
  }
  return (
    <div style={{
        backgroundColor:"#fff",
        overflow:"hidden"
    }}>

<div className="container cons">

<Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h6">Smartphones & Tablets</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/products")}>
          View All
        </Button>
      </Box>

      <Box sx={{ position: "relative", margin: "0 auto", maxWidth: "1200px" }}>
        <IconButton
          sx={{ position: "absolute", left: "-40px", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
          onClick={() => sliderRef.current.slickPrev()}
        >
          <ArrowBackIos />
        </IconButton>

        <Slider ref={sliderRef} {...settings}>
          {laptops.map((value,index) => (
                      <div className="card cradss" key={index}>
                         <div className="image-container i" style={{
                            textAlign:""
                         }}>
                           <img src={value.image[0]} alt="Product Image"    onClick={() => handleNavigate(value._id)}/>
                           <div className="price">
                             {Math.round(value.percentage)} % Offer
                           </div>
                         </div>
                
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
                           <button
                             className="buy-button button"
                             onClick={()=>{
                                navigate("/checkout",{
                                  state:{
                                    userCarts:value
                                  }
                                })
                              }}
                           >
                             Buy Now
                           </button>
                
                         </div>
                       </div>
          ))}
        </Slider>

        <IconButton
          sx={{ position: "absolute", right: "-40px", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
          onClick={() => sliderRef.current.slickNext()}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
    </div>

    </div>


  );
};

export default Mobile;
