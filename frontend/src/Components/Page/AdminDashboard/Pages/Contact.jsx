import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid2";

import Header from "../Common/Layout/Header/Header";
import client from "../../../Common/Client/Client";
import Loader from "../Common/Layout/Loader/Loader";


const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    id: "",
    phoneIndia: "",
    whatsapp: "",
    email: "",
   
    address:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    phoneIndia: "",
    whatsapp: "",
    email: "",
   
    address:""
  });

  useEffect(() => {
    fecthContact();
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
  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if(fieldName==="address"){
      if(fieldValue.length<10){
        message="Please enter a valid address"
        }else{
          message="";
        }

    }
    if (fieldName === "phoneIndia") {
      // Remove non-numeric characters for validation
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 10) {
        message = "Phone number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "Phone number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid Phone Number";
        } else {
          message = "";
        }
      }
    }

   

    if (fieldName === "whatsapp") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 10) {
        message = "whatsapp number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "whatsapp number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid whatsapp Number";
        } else {
          message = "";
        }
      }
    }

    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (!emailRegex.test(fieldValue)) {
        message = `Email is Invalid`;
      } else {
        message = "";
      }
    }




    
    return { message: message };
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    toast.dismiss()
    if (
      contactInfo.email === "" ||
     
      contactInfo.phoneIndia === "" ||
      
      contactInfo.whatsapp === "" ||
    
      contactInfo.address===""
    ) {
      toast.error("Please enter all input field in the  form.");
      return;
    } else if (
      error.email !== "" ||
     
      error.phoneIndia !== "" ||
     
      error.whatsapp !== "" ||
      
      error.address!==""
    ) {
      toast.error("Please correct the errors in the form.");
    } else {
      postData();
    }
  };

  const postData = async () => {
    toast.dismiss()
    const updatedContactInfo = {
      ...contactInfo,
      phoneIndia: contactInfo.phoneIndia,
     
      whatsapp: contactInfo.whatsapp,
    };
    setContactInfo(updatedContactInfo);
    setLoading(true);
    try {
      console.log(contactInfo);
      const response = await client.post("/contact/save-contact", updatedContactInfo,{withCredentials:true});

      if (response.status === 200) {
        toast.success("Contact information updated successfully");
        fecthContact();
        setLoading(false);
      }
    } catch (err) {
     
      setLoading(false);
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to get contact details");
      }
    }
  };
  return (
    <Fragment>
        <Header/>
      <main id="main" className="main">
        <div className="pagetitle">
         
          <nav style={{ marginTop: "10px" }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Manage/Contact Details</li>
            </ol>
          </nav>
        </div>

        <section
          className="section dashboard"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
            <div className="card-body" style={{ padding: "20px" }}>
              <h5
                className="card-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                update Contact Details
              </h5>

              <Grid container spacing={2}>
                {/* India Phone and UAE Phone on the same line */}
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <TextField
                    fullWidth
                    label="India Phone Number"
                    name="phoneIndia"
                    value={contactInfo.phoneIndia}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[0-9+]$/;

                      // Check if the pressed key is not allowed
                      if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action of the disallowed key
                      }
                    }}
                    onChange={handleChange}
                    error={!!error.phoneIndia}
                    onBlur={handleBlur}
                    helperText={error.phoneIndia}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 10,
                      },
                    }}
                  />
                     </Grid>

<Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <TextField
                    label="WhatsApp Number"
                    fullWidth
                    name="whatsapp"
                    value={contactInfo.whatsapp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!error.whatsapp}
                    helperText={error.whatsapp}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[0-9+]$/;

                      // Check if the pressed key is not allowed
                      if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault(); // Prevent the default action of the disallowed key
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 10,
                      },
                    }}
                  />
                </Grid>
             

              
              </Grid>

              <Grid container spacing={2}>
                {/* WhatsApp and Email on the same line */}
               

                <Grid
                  item
                  size={{
                    xs: 12,
                  
                  }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    error={!!error.email}
                    helperText={error.email}
                    onKeyDown={(event) => {
                      if (event.key === " ") {
                        event.preventDefault(); // Prevent space from being entered
                      }
                    }}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
             
             
              <Grid container spacing={2}>
                <Grid
                  item
                  size={{
                    xs: 12,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Adress"
                    name="address"
                    value={contactInfo.address}
                  rows={2}
                  multiline
                    error={!!error.address}
                    helperText={error.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 300,
                      },
                    }}
                    onKeyDown={(e) => {
                     
                
                      // Prevent spaces as the first character
                      if (contactInfo.address.length === 0 && e.key === " ") {
                        e.preventDefault();
                        return;
                      }
                
                      // Check if the pressed key is not allowed
                    
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </section>
      </main>
      {loading && <Loader />}
    </Fragment>
  );
};

export default Contact;
