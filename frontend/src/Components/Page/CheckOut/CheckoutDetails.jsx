import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/userSlice";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import { fetchUserCart } from "../../redux/userCartSlice";
import {
  addToCartPost,
  addToCartUpdate,
  deleteAddToCart,
} from "../../redux/addtoCardSlice";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Radio, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";

const steps = [
  "User Details",
  "Address Details",
  "Product Details",
  "Payment Details",
];

const CheckoutDetails = ({ userCarts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [button,setButton]=useState(true)
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.userCart);
  const [activeStep, setActiveStep] = React.useState(0);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = React.useState({
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [formData, setFormData] = React.useState({
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });
  useEffect(() => {
    if (userCarts === undefined) {
      navigate("/");
    } else {
      dispatch(fetchUser());
      dispatch(fetchUserCart());
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setButton(true)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const userTotalPrice = userCart?.reduce(
    (acc, item) => acc + item.product.offerPrice * item.addToCart.quantity,
    0
  );

  const handleAddToCart = (id) => {
    if (userTotalPrice > 100000) {
      toast.dismiss();
      toast.error("Cannot add more than 100000");
    } else {
      dispatch(addToCartPost(id));
      dispatch(fetchUserCart());
    }
  };

  const handleSub = (id) => {
    dispatch(addToCartUpdate(id));
    dispatch(fetchUserCart());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(deleteAddToCart(id));
    dispatch(fetchUserCart());
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  //handle Blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevState) => ({
        ...prevState,
        [name]: `${name} field is required`,
      }));
    }
  };

  //handledown

  const handleDown = (e) => {
    if (e.key === " " && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };

  //handleFormChange

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "doorno") {
      if (fieldValue.length < 2) {
        message = "Doorno is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "street") {
      if (fieldValue.length < 3) {
        message = "street is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "landmark") {
      if (fieldValue === "") {
        message = "";
      } else if (fieldValue.length < 3) {
        message = "Land Mark is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "area") {
      if (fieldValue.length < 3) {
        message = "Area is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "district") {
      if (fieldValue.length < 3) {
        message = "District is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "state") {
      if (fieldValue.length < 3) {
        message = "State is invalid";
      } else {
        message = "";
      }
    }

    if (fieldName === "pincode") {
      if (fieldValue.length < 6) {
        message = "Pincode must need 6 number";
      } else if (fieldValue.length > 6) {
        message = "Pincode much larger";
      } else {
        message = "";
      }
    }

    return { message: message };
  };

  const validateForm = () => {
    let isValid = true;

    // Validation checks
    if (
      formData.area === "" ||
      formData.district === "" ||
      formData.doorno === "" ||
      formData.pincode === "" ||
      formData.state === "" ||
      formData.street === ""
    ) {
      isValid = false;
      toast.error("Please fill the all field in address");
    } else if (
      error.area !== "" ||
      error.district !== "" ||
      error.doorno !== "" ||
      error.landmark !== "" ||
      error.pincode !== "" ||
      error.state !== "" ||
      error.street !== ""
    ) {
      isValid = false;
      toast.error("Please check the error");
    }

    return isValid;
  };

  const handleStepFirst = () => {
    toast.dismiss();
    if (!user.phoneNumber) {
      toast.error("Please update a current profile");
    } else {
      handleNext();
    }
  };

  const hanldeUpdateAddress = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (useNewAddress === false) {
      handleNext();
      return;
    }
    if (!validateForm()) {
      return;
    }

    handleNext();
  };

  const handleThirdStep = () => {
    toast.dismiss();
    if (userTotalPrice > 100000) {
      toast.error("Your total price is more than 1,00,000");
    } else {
      setButton(false)
      handleNext();
     
    }
  };

  const handleConfirmOrder=async(e)=>{
    e.preventDefault();
    toast.dismiss();
    if (userCarts._id) {
      if(useNewAddress===true){

        const formDatas={
          productId:userCarts._id,
          quantity:quantity,
          totalPrice:quantity * userCarts.offerPrice,
          address:`${formData.doorno},${formData.street},${formData.street},${formData.area},${formData.district},${formData.state}-${formData.pincode}(${formData.landmark})`,

        }

        console.log(formDatas);

      }else{
        const formDatas={
          productId:userCarts._id,
          quantity:quantity,
          totalPrice:quantity * userCarts.offerPrice,
          address:`${user.address.doorno},${user.address.street},${user.address.street},${user.address.area},${user.address.district},${user.address.state}-${user.address.pincode}(${user.address.landmark})`,

        }

        console.log(formDatas);
      }
        

    }else{
      if(useNewAddress===true){

        const formDatas={
          productId:userCart?.map((value)=>value.product._id),
          quantity:userCart?.map((value)=>value.addToCart.quantity),
          totalPrice:userTotalPrice,
          address:`${formData.doorno},${formData.street},${formData.street},${formData.area},${formData.district},${formData.state}-${formData.pincode}(${formData.landmark})`,

        }

        console.log(formDatas);

      }else{
        const formDatas={
          productId:userCart?.map((value)=>value.product._id),
          quantity:userCart?.map((value)=>value.addToCart.quantity),
          totalPrice:userTotalPrice,
          address:`${user.address.doorno},${user.address.street},${user.address.street},${user.address.area},${user.address.district},${user.address.state}-${user.address.pincode}(${user.address.landmark})`,

        }

        console.log(formDatas);
      }
    }

  }

  console.log("cart",userCart)
  return (
    <div className="container con  mt-2">
      <div className="row">
        <div
          className="col-lg-9 col-12"
          style={{
            backgroundColor: "white",
          }}
        >
          <div>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>

                    {activeStep === 0 && (
                      <StepContent>
                        <div className="user-info">
                          <span>
                            <strong>User Name:</strong> {user?.username}
                          </span>
                          <span>
                            <strong>Email:</strong> {user?.email}
                          </span>
                          <span>
                            {!user?.phoneNumber ? (
                              <>
                                <button
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "10px",
                                  }}
                                  onClick={() => {
                                    navigate("/account");
                                  }}
                                >
                                  Update Profile
                                </button>
                              </>
                            ) : (
                              <>
                                {" "}
                                <strong>Phone Number:</strong>{" "}
                                {user?.phoneNumber}
                              </>
                            )}
                          </span>
                        </div>

                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleStepFirst}
                          disabled={activeStep === steps.length - 1}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </StepContent>
                    )}

                    {activeStep === 1 && (
                      <StepContent>
                        <div className="checkout-container">
                          <div className="address-option">
                            <input
                              type="radio"
                              name="address"
                              checked={!useNewAddress}
                              onChange={() => setUseNewAddress(false)}
                            />
                            <label>
                              <strong>Default Address:</strong>{" "}
                              {user.address.doorno}, {user.address.street},{" "}
                              {user.address.area}, {user.address.district},{" "}
                              {user.address.state} - {user.address.pincode} (
                              {user.address.landmark})
                            </label>
                          </div>

                          <div className="address-option">
                            <input
                              type="radio"
                              name="address"
                              checked={useNewAddress}
                              onChange={() => setUseNewAddress(true)}
                            />
                            <label>
                              <strong>Add New Address</strong>
                            </label>
                          </div>

                          {useNewAddress && (
                            <>
                              <div className="details-forms">
                                <TextField
                                  label="Door No"
                                  name="doorno"
                                  required
                                  value={formData.doorno}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.doorno}
                                  helperText={error.doorno}
                                  inputProps={{ maxLength: 10 }}
                                  className="test"
                                  onKeyDown={(e) => {
                                    handleDown(e);
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern =
                                      /^[0-9A-Za-z/-]$/;

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />

                                <TextField
                                  label="Street Name"
                                  name="street"
                                  value={formData.street}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.street}
                                  helperText={error.street}
                                  inputProps={{ maxLength: 20 }}
                                  onKeyDown={(e) => {
                                    handleDown(e);
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                      "space",
                                    ];
                                    const allowedCharPattern =
                                      /^[0-9A-Za-z/':;.,()-]$/;
                                    const isSpaceKey = e.key === " ";

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key) &&
                                      !isSpaceKey
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                  required
                                  className="test"
                                />

                                <TextField
                                  label="Area"
                                  name="area"
                                  value={formData.area}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.area}
                                  inputProps={{ maxLength: 20 }}
                                  helperText={error.area}
                                  required
                                  className="test"
                                  onKeyDown={handleDown}
                                />
                                <TextField
                                  label="Land Mark"
                                  name="landmark"
                                  value={formData.landmark}
                                  error={!!error.landmark}
                                  helperText={error.landmark}
                                  onChange={handleFormChange}
                                  inputProps={{ maxLength: 20 }}
                                  className="test"
                                  onKeyDown={handleDown}
                                />
                              </div>
                              <div className="details-form">
                                <TextField
                                  label="District"
                                  name="district"
                                  value={formData.district}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.district}
                                  helperText={error.district}
                                  required
                                  inputProps={{ maxLength: 20 }}
                                  className="tet"
                                  onKeyDown={(e) => {
                                    handleDown(e);
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "Space",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[a-zA-Z/]$/;
                                    const isSpaceKey = e.key === " ";

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key) &&
                                      !isSpaceKey
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />

                                <TextField
                                  label="State"
                                  name="state"
                                  type="text"
                                  value={formData.state}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.state}
                                  helperText={error.state}
                                  required
                                  inputProps={{ maxLength: 20 }}
                                  className="tet"
                                  onKeyDown={(e) => {
                                    handleDown(e);
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "Space",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[a-zA-Z/]$/;
                                    const isSpaceKey = e.key === " ";

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key) &&
                                      !isSpaceKey
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />

                                <TextField
                                  label="Pincode"
                                  name="pincode"
                                  value={formData.pincode}
                                  onChange={handleFormChange}
                                  onBlur={handleBlur}
                                  error={!!error.pincode}
                                  helperText={error.pincode}
                                  inputProps={{ maxLength: 6 }}
                                  required
                                  className="tet"
                                  onKeyDown={(e) => {
                                    handleDown(e);
                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                    ];
                                    const allowedCharPattern = /^[0-9]$/;

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={hanldeUpdateAddress}
                          disabled={activeStep === steps.length - 1}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </StepContent>
                    )}

                    {activeStep === 2 && (
                      <StepContent>
                        {userCarts._id ? (
                          <>
                            <div
                              className="col-lg-12 mb-4 "
                              style={{
                                borderBottom: "1px solid lightgray",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "white",
                                }}
                              >
                                <div
                                  className="wishlist"
                                  style={{
                                    boxShadow: "none",
                                  }}
                                >
                                  <img
                                    onClick={() =>
                                      handleNavigate(userCarts._id)
                                    }
                                    src={userCarts.image[0]}
                                    alt={userCarts.productName}
                                    className="card-img-top"
                                    style={{
                                      cursor: "pointer",
                                      height: "200px",
                                      width: "200px",
                                    }}
                                  />
                                  <div
                                    className="card-body"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <h5
                                      className="card-title"
                                      onClick={() =>
                                        handleNavigate(userCarts._id)
                                      }
                                    >
                                      {userCarts.productName}
                                    </h5>
                                    <p className="text-muted">
                                      Brand: {userCarts.brandName}
                                    </p>
                                    <p className="text-danger fw-bold">
                                      ₹{userCarts.offerPrice}
                                      <span className="original-prices">
                                        {" "}
                                        ₹ {userCarts.originalPrice}
                                      </span>
                                      <span className="offer">
                                        {Math.round(userCarts.percentage)}%
                                        Offer
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className="wishlist"
                                  style={{
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="cart-item">
                                    <button
                                      style={{
                                        backgroundColor: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                      className="cart-btn"
                                      onClick={() => {
                                        setQuantity(quantity - 1);
                                      }}
                                      disabled={quantity <= 1}
                                    >
                                      <GrSubtractCircle />
                                    </button>
                                    <p className="cart-quantity">{quantity}</p>
                                    <button
                                      style={{
                                        backgroundColor: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                      }}
                                      disabled={quantity >= 5}
                                      onClick={() => {
                                        setQuantity(quantity + 1);
                                      }}
                                      className="cart-btn"
                                    >
                                      <IoMdAddCircleOutline />
                                    </button>
                                  </div>
                                  <div>
                                    <p>
                                      <span className="card-title">
                                        Total Price :
                                      </span>{" "}
                                      <span className="text-danger fw-bold">
                                        ₹ {userCarts.offerPrice * quantity}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            className="container   mt-2"
                            style={{
                              maxWidth: "100%",
                            }}
                          >
                            <div className="row">
                              {userCart?.length > 0 && (
                                <div className="col-lg-12 col-12">
                                  <div className="col-lg-12 mb-4 "></div>
                                  {userCart.map((item, index) => (
                                    <div
                                      key={index}
                                      className="col-lg-12 mb-4 "
                                      style={{
                                        borderBottom: "1px solid lightgray",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          backgroundColor: "white",
                                        }}
                                      >
                                        <div
                                          className="wishlist"
                                          style={{
                                            boxShadow: "none",
                                          }}
                                        >
                                          <img
                                            onClick={() =>
                                              handleNavigate(item.product._id)
                                            }
                                            src={item.product.image[0]}
                                            alt={item.product.productName}
                                            className="card-img-top"
                                            style={{
                                              cursor: "pointer",
                                              height: "200px",
                                              width: "200px",
                                            }}
                                          />
                                          <div
                                            className="card-body"
                                            style={{ cursor: "pointer" }}
                                          >
                                            <h5
                                              className="card-title"
                                              onClick={() =>
                                                handleNavigate(item.product._id)
                                              }
                                            >
                                              {item.product.productName}
                                            </h5>
                                            <p className="text-muted">
                                              Brand: {item.product.brandName}
                                            </p>
                                            <p className="text-danger fw-bold">
                                              ₹{item.product.offerPrice}
                                              <span className="original-prices">
                                                {" "}
                                                ₹ {item.product.originalPrice}
                                              </span>
                                              <span className="offer">
                                                {Math.round(
                                                  item.product.percentage
                                                )}
                                                % Offer
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        <div
                                          className="wishlist"
                                          style={{
                                            justifyContent: "space-evenly",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div className="cart-item">
                                            <button
                                              style={{
                                                backgroundColor: "white",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "20px",
                                              }}
                                              className="cart-btn"
                                              onClick={() => {
                                                handleSub(item.product._id);
                                              }}
                                              disabled={
                                                item.addToCart.quantity <= 1
                                              }
                                            >
                                              <GrSubtractCircle />
                                            </button>
                                            <p className="cart-quantity">
                                              {item.addToCart.quantity}
                                            </p>
                                            <button
                                              style={{
                                                backgroundColor: "white",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "20px",
                                              }}
                                              disabled={
                                                item.addToCart.quantity >= 5
                                              }
                                              onClick={() => {
                                                handleAddToCart(
                                                  item.product._id
                                                );
                                              }}
                                              className="cart-btn"
                                            >
                                              <IoMdAddCircleOutline />
                                            </button>
                                          </div>
                                          <div>
                                            <p>
                                              <span className="card-title">
                                                Total Price :
                                              </span>{" "}
                                              <span className="text-danger fw-bold">
                                                ₹{" "}
                                                {item.product.offerPrice *
                                                  item.addToCart.quantity}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleThirdStep}
                          disabled={activeStep === steps.length - 1}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </StepContent>
                    )}
                    {activeStep === 3 && (
                      <StepContent>
                        <div className="payment-container">
                          <FormControl>
                            <FormLabel>Select Payment Method</FormLabel>
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={paymentMethod === "cod"}
                                  onChange={() => setPaymentMethod("cod")}
                                />
                              }
                              label="Pay on Delivery"
                            />
                          </FormControl>
                        </div>

                        <Button
                          variant="contained"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                      </StepContent>
                    )}
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </div>

        {userCarts._id ? (
          <>
            <div className="col-lg-3 col-12 mt-2">
              <div
                className="card shadow-sm p-3 rounded"
                style={{
                  position: "sticky",
                  top: "13%",
                  border: "none",
                  borderRadius: "none",
                }}
              >
                <div className="card-body">
                  <h4 className="card-title mb-3 text-center fw-bold">
                    Order Summary
                  </h4>
                  <hr />

                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total Items:</span>
                    <span>1</span>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-semibold">Subtotal:</span>
                    <span>₹ {quantity * userCarts.originalPrice}</span>
                  </div>

                  <div className="d-flex justify-content-between mt-2 text-success">
                    <span className="fw-semibold">Discount:</span>
                    <span>
                      -₹
                      {quantity * userCarts.originalPrice -
                        quantity * userCarts.offerPrice}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-semibold">Delivery:</span>
                    <span>
                      <del className="text-muted">₹40</del>{" "}
                      <span className="text-success fw-bold">FREE</span>
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Total Price:</h5>
                    <h5 className="text-danger fw-bold">
                      ₹{quantity * userCarts.offerPrice}
                    </h5>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3 py-2 fw-bold"
                    style={{
                      backgroundColor: "blue",
                    }}
                    disabled={button}
                    onClick={handleConfirmOrder}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          userCart?.length > 0 && (
            <div className="col-lg-3 col-12 mt-2">
              <div
                className="card shadow-sm p-3 rounded"
                style={{
                  position: "sticky",
                  top: "13%",
                  border: "none",
                  borderRadius: "none",
                }}
              >
                <div className="card-body">
                  <h4 className="card-title mb-3 text-center fw-bold">
                    Order Summary
                  </h4>
                  <hr />

                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total Items:</span>
                    <span>{userCart.length}</span>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-semibold">Subtotal:</span>
                    <span>
                      ₹
                      {userCart.reduce(
                        (acc, item) =>
                          acc +
                          item.product.originalPrice * item.addToCart.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mt-2 text-success">
                    <span className="fw-semibold">Discount:</span>
                    <span>
                      -₹
                      {userCart.reduce(
                        (acc, item) =>
                          acc +
                          (item.product.originalPrice -
                            item.product.offerPrice) *
                            item.addToCart.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-semibold">Delivery:</span>
                    <span>
                      <del className="text-muted">₹40</del>{" "}
                      <span className="text-success fw-bold">FREE</span>
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Total Price:</h5>
                    <h5 className="text-danger fw-bold">₹{userTotalPrice}</h5>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3 py-2 fw-bold"
                    style={{
                      backgroundColor: "blue",
                    }}
                    onClick={handleConfirmOrder}
                    disabled={button}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
