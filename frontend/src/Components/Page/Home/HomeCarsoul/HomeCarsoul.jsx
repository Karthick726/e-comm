import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation
import "./HomeCarsoul.css";
import { fetchProducts } from "../../../redux/productSlice";
import { FaTruck, FaUndo, FaHeadset, FaLock } from "react-icons/fa";

const HomeCarsoul = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const lastProductsByCategory = Object.values(
    products.reduce((acc, product) => {
      acc[product.category] = product;
      return acc;
    }, {})
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === lastProductsByCategory.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? lastProductsByCategory.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{
      position: "relative",
    }}>
        <section className="banner-area" style={{ height: "100vh" }}>
      <div className="container">
        <div
          className="row fullscreen align-items-center justify-content-start"
          style={{ height: "100vh" }}
        >
          <div className="col-lg-12">
            <div
              className="active-banner-slider"
              style={{
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                className="carousel-track"
                style={{
                  display: "flex",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {lastProductsByCategory.map((product, index) => (
                  <div
                    key={index}
                    className="row single-slide align-items-center d-flex"
                    style={{
                      minWidth: "100%",
                      justifyContent:"space-evenly"
                    }}
                  >
                    <div className="col-lg-5 col-md-6">
                      <div className="banner-content">
                        <h1>
                          {product.brandName} <br />
                          Collection!
                        </h1>
                        <p>{product.description.slice(0, 200)}...</p>
                        <div className="add-bag d-flex align-items-center">
                          <a className="add-btn" href>
                            <span className="lnr lnr-cross" />
                          </a>
                          <span className="add-text text-uppercase"   onClick={() => handleNavigate(product._id)} >
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="banner-img">
                        <img
                          className="img-fluid"
                          src={product.image[0]}
                          alt="product"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="carousel-controls">
                <button className="carousel-btn" onClick={prevSlide}>
                <img src="img/banner/prev.png" />
 
                </button>
                <button className="carousel-btn" onClick={nextSlide}>
             <img src="img/banner/next.png" />
 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   

<section className="features-area section_gap">
  <div className="container">
    <div className="row features-inner">
      {/* Single Feature */}
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-features">
          <div className="f-icon">
            <FaTruck size={40} color="#F49124" />
          </div>
          <h6>Fast & Free Shipping</h6>
          <p>Enjoy free shipping on all orders with no minimum purchase.</p>
        </div>
      </div>
      {/* Single Feature */}
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-features">
          <div className="f-icon">
            <FaUndo size={40} color="#F49124" />
          </div>
          <h6>Hassle-Free Returns</h6>
          <p>Easy returns within 30 days for a smooth shopping experience.</p>
        </div>
      </div>
      {/* Single Feature */}
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-features">
          <div className="f-icon">
            <FaHeadset size={40} color="#F49124" />
          </div>
          <h6>24/7 Customer Support</h6>
          <p>Our support team is available anytime to assist you.</p>
        </div>
      </div>
      {/* Single Feature */}
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-features">
          <div className="f-icon">
            <FaLock size={40} color="#F49124" />
          </div>
          <h6>Secure Payment</h6>
          <p>100% secure payment with encryption protection.</p>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>

  );
};

export default HomeCarsoul;
