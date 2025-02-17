import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";
import Loader from "../../../Common/Loader/Loader";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, username, password } = location.state || {};
  const [resendAttempts, setResendAttempts] = useState(0); 
  const [lastResendTime, setLastResendTime] = useState(0)
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ Otp: "" });


  useEffect(() => {
    if (!email || !username || !password) {
      navigate("/");
    }
  }, [email, username, password]);

 console.log(resendAttempts)

  const handleOtpSubmit = (e) => {
    toast.dismiss();
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
    } else if (error.Otp !== "") {
      alert("Check error at OTP field.");
    } else {
      console.log("OTP submitted:", otp);
      setLoading(true);
      otpsend();
    }
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
    if (name === "Otp") {
      if (value.length !== 6) {
        setError((prevError) => ({
          ...prevError,
          [name]: `${name} should be 6 digits`,
        }));
      } else {
        setOtp(value);
        setError((prevError) => ({
          ...prevError,
          [name]: "",
        }));
      }
    }
  };


  console.log(otp)
  const otpsend = async () => {
    try {
      const response = await client.post(
        "/user/otp",
        {
          username,
          password,
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success("OTP Verified!");
        navigate("/")
        console.log(response.data);
      }
    } catch (err) {
      setLoading(false);
      if(err.response.status===500){
        toast.error("Invalid OTP");
      }
      console.log(err);
    }
  };

  const handleResend = async () => {
    toast.dismiss();
    const currentTime = Date.now();
    const timeSinceLastResend = currentTime - lastResendTime;
    console.log(timeSinceLastResend)
  
    if (resendAttempts >= 3) {
      const oneHour = 60 * 60 * 1000;
      if (timeSinceLastResend < oneHour) {
        toast.error("Please try again after 1 hour.");
        navigate("/");
        return;
      } else {
        setResendAttempts(0);
      }
    } else if (resendAttempts >= 1 && timeSinceLastResend < 5 * 60 * 1000) {
      toast.error("Please wait for 5 minutes before requesting another OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await client.post(
        "/user/resendotp",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setResendAttempts((prev) => prev + 1); 
        setLastResendTime(currentTime);
        toast.success("OTP Resent Successfully!");
      }
    } catch (err) {
      setLoading(false);
console.log(err);

    }
  };

  return (
    <div className="container-fluid full-height-background d-flex justify-content-center align-items-center">
      <div className="overlay"></div>
      <div className="login-form">
        <Typography
          variant="h5"
          style={{ color: "#000", textAlign: "center", marginBottom: "20px" }}
        >
          Enter the 6-Digit OTP
        </Typography>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 2 } }}
          noValidate
          autoComplete="off"
          onSubmit={handleOtpSubmit}
        >
          <TextField
            id="outlined-basic"  variant="outlined"
            label="OTP"
          
            name="Otp"
            style={{ width: "80%" }}
            fullWidth
          
            onChange={handleChange}
            onBlur={handleBlur}
            slotProps={{
              htmlInput: {
                maxLength: 6,
              },
            }}
            onKeyDown={(e) => {
              const allowedCharPattern = /^[0-9]$/;
              const isSpecialKey = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
                "Home",
                "End",
              ].includes(e.key);

              if (!allowedCharPattern.test(e.key) && !isSpecialKey) {
                e.preventDefault();
              }
            }}
            helperText={error.Otp ? error.Otp : ""}
            error={!!error.Otp}
          />

          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "end",
              margin: "5px 0px",
            }}
          >
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={handleResend}
            >
              Resend OTP?
            </span>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px", width: "200px" }}
          >
            Submit OTP
          </Button>
        </Box>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Otp;
