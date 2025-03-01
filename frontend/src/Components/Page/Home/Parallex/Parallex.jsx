import React from "react";
import { useNavigate } from "react-router-dom";

const Parallex = () => {
  const navigate=useNavigate()
  return (
    <div className="parallax-container">
      <div className="parallax-content">
        <div className="abs">
          <h3 className="about-heading">
          Discover the Best Deals on Top-Quality Products!
          </h3>
          <p className="about-description" style={{
            color:"white"
          }}>
            Shop now and enjoy exclusive offers on your favorite items.
          </p>
          <div className="projects-content-btn mt-3">
          <button
                  className="btn btn-primary contact-button"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <span>View all</span>
                </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Parallex;
