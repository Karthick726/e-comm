import React, { Fragment, useState } from "react";
import { TextField, Button, Typography, Link, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import forget from "../../../../Assets/Images/forget.jpg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import client from "../../../Common/Client/Client";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: "",
  });

  const errorMessage = (fieldName, fieldValue) => {
    let message = "";
    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (!emailRegex.test(fieldValue)) {
        message = `Email is Invalid`;
      } else if (fieldValue.length < 3) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    }
    return { message: message };
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;
    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setEmail(value);
  };

  const handleResetPassword = async () => {
    toast.dismiss();
    if (email === "") {
      toast.error("Please enter your email");
    } else if (error.email !== "") {
      toast.error(error.email);
    } else {
      try {
        const response = await client.post(
          "/user/forgetpassword",
          { email: email },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Password reset link sent to your email");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <Fragment>
      
      <Box className="forget-container">
        <Grid container className="forget-grid">
       

          <Grid item xs={12} sm={4} className="forget-image">
            <img src={forget} alt="Forgot Password" className="forget-image" />
          </Grid>
          <Grid item xs={12} sm={4} className="forget-form">
            <Box className="forget-box">
              <Typography variant="h5" className="forget-title">
                Forgot Your Password?
              </Typography>
              <Typography variant="body1" className="forget-subtitle">
          No worries, enter your email and we’ll send a reset link.
        </Typography>
              <TextField
                label="Enter Your Email"
                variant="outlined"
                required
                name="email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                onKeyDown={(e) => {
                  const allowedKeys = [
                    "Backspace",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                    "Tab",
                  ];
                  const allowedCharPattern = /^[0-9a-z._@-]$/;
                  if (!allowedKeys.includes(e.key) && !allowedCharPattern.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                helperText={error.email ? error.email : ""}
                error={!!error.email}
                className="forget-input"
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleResetPassword}
                className="forget-button"
              >
                Reset Password
              </Button>
              <Typography style={{
                color: "#227cf7",
                fontSize: "16px",
              }} onClick={()=>{
                navigate('/account')
              }}>
              <IoMdArrowRoundBack/> Back To Home 
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};
