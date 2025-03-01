import React, { useState } from "react";
import { motion } from "framer-motion";
import certificationImg from "../../../../Assets/Images/choose1.png";
import paymentImg from "../../../../Assets/Images/choose4.png";
import deliveryImg from "../../../../Assets/Images/choose2.png";
import arrow from "../../../../Assets/Images/arr.png";
import { FaArrowRight } from "react-icons/fa6";

const data = [
  { id: "certification", label: "Authenticity Certification", img: certificationImg },
  { id: "payment", label: "Payment Secure", img: paymentImg },
  { id: "delivery", label: "Express Delivery", img: deliveryImg },
];

const Choose = () => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <div className="features-areas section_gap">
    <div className="certification-container container cons">
      <div className="button-group">
        {data.map((item) => (
          <button
            key={item.id}
            className={`option-button ${selected.id === item.id ? "active" : ""}`}
            onClick={() => setSelected(item)}
          >
            <img src={item.img} alt={item.label} className="icon" />
            <span className="label">{item.label}</span>
            <FaArrowRight/>
          </button>
        ))}
      </div>

      <div
        key={selected.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="image-container"
      >
        <img src={selected.img} alt={selected.label} className="image" />
        <img src={arrow} alt="arrow" className="up-image"/>
      </div>

      <div className="info-section">
        <h2>Who We Are<br />What We Do?</h2>
        <p>
        At ShopCart, we redefine online shopping with quality, security, and speed. Enjoy authentic products, secure payments, and fast delivery. Our commitment to customer satisfaction ensures seamless shopping with 24/7 support. Choose ShopCart for a trusted, hassle-free shopping experience. Shop smart, shop with confidence!
        </p>
        <div className="contact">
          <span className="call-icon">📞</span>
          <p><strong>How to Order?</strong><br /> CALL US: +91 73390 19587</p>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Choose;