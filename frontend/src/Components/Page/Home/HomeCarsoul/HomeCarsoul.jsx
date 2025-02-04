import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation
import "./HomeCarsoul.css";

const HomeCarsoul = () => {
  const navigate = useNavigate();
  const content = [
    {
      id: 1,
      image:
        "https://www.bigcmobiles.com/media/catalog/product/cache/e19e56cdd4cf1b4ec073d4305f5db95a/v/i/vivo_y18i_gem_green_.jpg", // Background image
      title: "Dell XPS 13",
      description:
        "The Dell XPS 13 is known for its stunning 13-inch display, powerful performance, and sleek design. Ideal for professionals and students alike.",
      price: 999.99,
    },
    {
      id: 2,
      image:
        "https://transvelo.github.io/electro-html/2.0/assets/img/1920X422/img1.jpg", // Background image
      title: "MacBook Pro M1",
      description:
        "Powered by Apple’s M1 chip, this laptop offers exceptional performance, long battery life, and a gorgeous Retina display. Perfect for creative professionals.",
      price: 1299.99,
    },
    {
      id: 3,
      image:
        "https://transvelo.github.io/electro-html/2.0/assets/img/1920X422/img1.jpg", // Background image
      title: "iPhone 14 Pro",
      description:
        "The iPhone 14 Pro features a 120Hz ProMotion OLED display, the new A16 chip, and a 48MP camera. It’s perfect for those who want top-tier performance and aesthetics.",
      price: 1099.99,
    },
    {
      id: 4,
      image:
        "https://transvelo.github.io/electro-html/2.0/assets/img/1920X422/img1.jpg", // Background image
      title: "Samsung Galaxy S23",
      description:
        "With its 120Hz AMOLED display, Snapdragon 8 Gen 2 chip, and incredible camera capabilities, the Samsung Galaxy S23 is one of the best Android phones on the market.",
      price: 899.99,
    },
    {
      id: 5,
      image:
        "https://transvelo.github.io/electro-html/2.0/assets/img/1920X422/img1.jpg", // Background image
      title: "Sony WH-1000XM5 Headphones",
      description:
        "Sony’s WH-1000XM5 headphones deliver industry-leading noise cancellation, fantastic sound quality, and up to 30 hours of battery life. A must-have for audiophiles.",
      price: 349.99,
    },
  ];

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div className="container-fluid">
      <Slider {...settings}>
        {content.map((item) => (
          <div key={item.id} className="slider-item">
            {/* Background Image */}
            <div
              className="slider-background"
              style={{ backgroundImage: ""}}
            >
            <div className="slider">

            <motion.div
                className="slider-content"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>₹ {item.price}</p>
                <div className="projects-content-btn mt-4">
                  <button
                    className="btn btn-primary contact-button"
                    onClick={() => {
                      navigate("/contact-us");
                    }}
                  >
                    <span>Contact Us</span>
                  </button>
                </div>
              </motion.div>
              <motion.div
                className="slider-image"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <img src={item.image} alt="image"/>
                </motion.div>

            </div>
            
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarsoul;
