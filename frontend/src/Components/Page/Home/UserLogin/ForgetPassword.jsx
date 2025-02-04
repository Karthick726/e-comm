import React, { Fragment, useState } from "react";
import { TextField, Button, Typography, Link, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import forget from "../../../../src/Assets/Images/forget.jpg";
import toast from "react-hot-toast";
import client from "../../Common/Client/Client";
import { useNavigate } from "react-router-dom";

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
          "user/forgetpassword",
          { email: email },
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Password reset link sent to your email");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message)
      }
    }
  };

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="white"
        px={2}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%", maxWidth: "1200px" }}
        >
          <Grid
            item
            size={{
              xs: 12,
              sm: 6,
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={forget}
              alt="Forgot Password"
              style={{
                width: "100%",

                height: "auto",
              }}
            />
          </Grid>

          <Grid
            item
            size={{
              xs: 12,
              sm: 6,
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              textAlign="center"
              width="100%"
              maxWidth="350px"
              p={4}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "rgba(0,134,243,1)",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Forgot Your Password?
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

                  if (
                    !allowedKeys.includes(e.key) &&
                    !allowedCharPattern.test(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                helperText={error.email ? error.email : ""}
                error={!!error.email}
                sx={{
                  marginBottom: "20px",
                  backgroundColor: "#F7F9FC",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5px",
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleResetPassword}
                sx={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "10px 0",
                  fontWeight: "bold",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                Reset Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};
