import React, { useEffect, useState } from "react";
import "./footer.css";
import { Link, NavLink } from "react-router-dom";
import Client from "../../Client/Client";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import toast from "react-hot-toast";
import client from "../../Client/Client";
import { FaSquareFull } from "react-icons/fa";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    id: "",
    phoneIndia: "",
    whatsapp: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fecthContact();
  }, []);

  const fecthContact = async () => {
    toast.dismiss();
    try {
      const response = await client.get("/contact/get-contact", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data[0];
        console.log(data);
        const removeCountryCode = (data) => {
          return {
            ...data,
            id: data._id,
            email: data.email,
            address: data.address,

            phoneIndia: data.phoneIndia,

            whatsapp: data.whatsapp,
          };
        };

        const updatedContactInfo = removeCountryCode(data);
        console.log(updatedContactInfo);
        setContactInfo(updatedContactInfo);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to get contact details");
      }
    }
  };

  return (
    <>
      <footer className="ssfooter">
        <div className="container cons project-header1">
          <div className="footerlinks">
            <div className="row">
              <div className="col-md-4">
                {/* <img src="" /> */}
                <h5 className="about-service-title">About Us</h5>
                <p className=" about-description">
                  At ShopCart, we redefine online shopping with quality,
                  security, and speed. Enjoy authentic products, secure
                  payments, and fast delivery. Our commitment to customer
                  satisfaction ensures seamless shopping with 24/7 support.
                  Choose ShopCart for a trusted, hassle-free shopping
                  experience. Shop smart, shop with confidence!
                </p>{" "}
              </div>

              <div className="col-md-4 footersections">
                <h5 className="about-service-title">Quick Links</h5>
                <ul className="quicklinks">
                  <li>
                    <FaSquareFull
                      style={{
                        color: "#FF5317",
                        fontSize: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <NavLink to="/" className=" about-description">
                      Home
                    </NavLink>
                  </li>
            
             
                  <li>
                    <FaSquareFull
                      style={{
                        color: "#FF5317",
                        fontSize: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <NavLink to="/products" className=" about-description">
                      Products
                    </NavLink>
                  </li>

                  <li>
                    <FaSquareFull
                      style={{
                        color: "#FF5317",
                        fontSize: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <NavLink to="/contact-us" className=" about-description">
                      Contact
                    </NavLink>
                  </li>

                  <li>
                    <FaSquareFull
                      style={{
                        color: "#FF5317",
                        fontSize: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <NavLink to="/account" className=" about-description">
                      Account
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 footersections">
                <h5 className="about-service-title">Reach Us</h5>
                <ul className="quicklinks">
                  {contactInfo.address !== "" > 0 ? (
                    <>
                      <li
                        className="footaddress "
                        style={{
                          display: "flex",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span>
                          <FaLocationDot
                            style={{
                              color: "#FF5317",
                              fontSize: "18px",
                            }}
                          />
                        </span>
                        <span className=" about-description">
                          {contactInfo.address}
                        </span>
                      </li>
                      <li
                        className="footmail"
                        style={{
                          display: "flex",
                          gap: "14px",
                        }}
                        onClick={() => {
                          window.location.href = `mailto:${contactInfo.email}`;
                        }}
                      >
                        <span>
                          <MdEmail
                            style={{
                              color: "#FF5317",
                              fontSize: "18px",
                            }}
                          />
                        </span>
                        <span className=" about-description">
                          {contactInfo.email}
                        </span>
                      </li>
                      <li
                        className="footphone"
                        style={{
                          display: "flex",
                          gap: "14px",
                        }}
                        onClick={() => {
                          window.location.href = `tel: ${contactInfo.phoneIndia}`;
                        }}
                      >
                        <span>
                          <TbPhoneCall
                            style={{
                              color: "#FF5317",
                              fontSize: "18px",
                            }}
                          />
                        </span>
                        <span className=" about-description">
                          {contactInfo.phoneIndia}
                        </span>
                      </li>
                    </>
                  ) : (
                    <li>Loading...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <hr style={{ color: "white" }} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
