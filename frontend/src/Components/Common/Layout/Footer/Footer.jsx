import React, { useEffect, useState } from "react";
import "./footer.css";
import { Link, NavLink } from "react-router-dom";
import Client from "../../Client/Client";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import toast from 'react-hot-toast';
import client from "../../Client/Client";
import { FaSquareFull } from "react-icons/fa";

const Footer = () => {
   const [contactInfo, setContactInfo] = useState({
      id: "",
      phoneIndia: "",
      whatsapp: "",
      email: "",
      address:""
    });

  const [serviceDetail,setServiceDetails]=useState([])



  
    
  useEffect(() => {
    fecthContact();
    getService()
  }, []);

  const fecthContact = async () => {
    toast.dismiss()
    try {
      const response = await client.get("/contact/get-contact",{
        withCredentials:true
      });
      if (response.status === 200) {
        const data = response.data[0];
        console.log(data);
        const removeCountryCode = (data) => {
          return {
            ...data,
            id: data._id,
            email: data.email,
            address:data.address,
          
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


  const getService=async()=>{
    try {
      const response = await client.get("/service/service",{
        withCredentials:true
      });
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setServiceDetails(data)
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to get service details");
      }
    }
 }
  return (
    <>
      <footer className="ssfooter">
        <div className="container con project-header1">
          


          <div className="footerlinks">
            <div className="row">
              <div className="col-md-3">
                {/* <img src="" /> */}
                <h5  className="about-service-title">About Us</h5>
                <p className=" about-description">
                United PVGAS Pvt Ltd delivers innovative solutions for the industrial sector, enhancing efficiency, reducing lead times, and optimizing performance across automation and infrastructure.
                </p>
              </div>

              <div className="col-md-3 footersections">
                <h5  className="about-service-title">Quick Links</h5>
                <ul className="quicklinks">
                  <li>
                  <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                    <NavLink to="/"  className=" about-description">Home</NavLink>
                  </li>
                  <li>
                  <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                    <NavLink to="/about-us" className=" about-description">About Us</NavLink>
                  </li>
                  <li>
                    <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                    <NavLink to="/service" className=" about-description">Services</NavLink>
                  </li>
                  <li>
                    <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                    <NavLink to="/projects" className=" about-description">Projects</NavLink>
                  </li>
                 
              
                  <li>
                    <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                    <NavLink to="/contact-us" className=" about-description">Contact</NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-md-3 footersections">
                <h5  className="about-service-title" style={{
                }}>Our Services</h5>
                <ul className="quicklinks">
                  {
                    serviceDetail.slice(0,6).map((item,index)=>{
                      return(
                        <li key={index}>
                           <FaSquareFull style={{ color: "#FF5317",
                            fontSize: "10px",
                            marginRight:"10px"

                  }}/>
                          <Link to={`/service `} className=" about-description">{item.title}</Link>
                        </li>
                      )
                    })
                  }
                 
                </ul>
              </div>

              <div className="col-md-3 footersections">
                <h5  className="about-service-title">Reach Us</h5>
                <ul className="quicklinks">
                  {contactInfo.address !=="" > 0 ? (
                    <>
                      <li
                        className="footaddress "
                        style={{
                          display: "flex",
                          gap: "14px",
                          flexWrap:"wrap"
                        }}
                      >
                        <span>
                          <FaLocationDot style={{
                            color: "#FF5317",
                            fontSize: "18px",
                          }} />
                        </span>
                        <span className=" about-description">{contactInfo.address}</span>
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
                          <MdEmail style={{
                            color: "#FF5317",
                            fontSize: "18px",
                          }} />
                        </span>
                        <span className=" about-description">{contactInfo.email}</span>
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
                          <TbPhoneCall style={{
                            color: "#FF5317",
                            fontSize: "18px",
                          }} />
                        </span>
                        <span className=" about-description">{contactInfo.phoneIndia}</span>
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

          <div className="companydetails">
            <div className="copyrights">
              <p style={{ color: "white" }}>
                Developed by <a href="https://hellowtec.com/" target="_blank" style={{
                  color: "#FF5317",
                  textDecoration:"none"
                }} >Hello Technologies</a>
              </p>
            </div>
            <div className="terms-privacy">
              <NavLink to="/terms">Terms of Service</NavLink> &nbsp;
              <NavLink to="/terms">Privacy Policy</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
