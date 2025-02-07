import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";
import backgroundImage from "../../../../Assets/Images/login.png";
import logo from "../../../../Assets/Images/Logo.jpg";

const ResetPassword = () => {
  const { token } = useParams();
  const [email,setEmail]=useState("")
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signshowPassword, setSignShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ password: "", confirmPassword: "" });

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await client.get(`/user/${token}`);
        if (response.status === 200) {
          setIsValidToken(true);
          setEmail(response.data)

        }
      } catch (err) {
        setIsValidToken(false);
        toast.error("Link is expired or invalid");
        navigate("/");
      }
    };
    getToken();
  }, [token, navigate]);


  const errorMessage = (fieldName, fieldValue) => {
    let message = "";

 
    
    if (fieldName === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    } 
    
    
    if (fieldName === "confirmPassword") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else if (fieldValue !== password) {
        message = "Passwords do not match";
      } else {
        message = "";
      }
    } 

    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));

    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss()
    if (password !== confirmPassword) {
      toast.error("Password and confirm password  not same!");
    } else if(password === "" || confirmPassword==="") {
      toast.error("please fill all feild");
    }else if(error.password !==""){
        toast.error("Password must be at least 8 characters");
    }else if(error.confirmPassword !==""){
        toast.error("Password must be at least 8 characters");
    }else{
        postPassword()
    }
  };

  const postPassword=async()=>{
try{
    const response=await client.post("/user/updatePassword",{
        password:password,
        email:email,

    },{
        withCredentials:true
    })

    if(response.status===200){
        toast.success("Password updated successfully");
        navigate("/account")
    }


}catch(err){
    console.log(err);
    toast.error("please try again later")
}
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlesignPassword = () => setSignShowPassword((show) => !show);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 400,
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              background: "rgb(6 6 6 / 20%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Box display="flex" justifyContent="center" mb={2}>
              <img src={logo} alt="Logo" height="80" width="80" style={{ borderRadius: "50%" }} />
            </Box>

            <Typography variant="h5" align="center" gutterBottom style={{
              color: "white"
            }}>
              🔒 Reset Your Password
            </Typography>

            {isValidToken === false ? (
              <Typography color="error" align="center">
                Link is expired or invalid. Redirecting...
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
             <TextField
             style={{
                width:"100%",
                color:"white",
                marginTop:"10px"
             }}
                  id="standard-basic"
                  className="form"
                  label="Password"
                  variant="standard"
                  value={password}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={error.password ? error.password : ""}
                  error={!!error.password}
                  slotProps={{
                    htmlInput: {
                      maxLength: 12,
                    },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

<TextField
                      id="standard-basic"
                      style={{
                        width:"100%",
                        color:"white",
                        marginTop:"10px"
                     }}
                      className="form"
                      label="Confirm Password"
                      variant="standard"
                      value={confirmPassword}
                      required
                      type={signshowPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        error.confirmPassword ? error.confirmPassword : ""
                      }
                      error={!!error.confirmPassword}
                      slotProps={{
                        htmlInput: {
                          maxLength: 12,
                        },
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handlesignPassword}>
                                {signshowPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                <Button
                  style={{
                    width:"100%",
                    marginTop:"30px"
                 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={!!error.password || !!error.confirmPassword}
                >
                  Reset Password
                </Button>
              </form>
            )}
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;