import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/userSlice";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [contactEdit, setContactEdit] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    phoneNumber: "",
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });

  console.log(user);
  // Set user details in form
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        doorno: user.address.doorno || "",
        street: user.address.street || "",
        landmark: user.address.landmark || "",
        area: user.address.area || "",
        district: user.address.district || "",
        state: user.address.state || "",
        pincode: user.address.pincode || "",
      });
    }
  }, [user]);

  console.log(formData)

  //handleBlur
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

    if (fieldName === "name") {
      if (fieldValue.length < 3) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    }

    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (!emailRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    }

    if (fieldName === "phoneNumber") {
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
      formData.email === "" ||
      formData.email === "" ||
      formData.username === "" ||
      formData.area === "" ||
      formData.district === "" ||
      formData.doorno === "" ||
      formData.pincode === "" ||
      formData.state === "" ||
      formData.street === ""
    ) {
      isValid = false;
      toast.error("Please fill the all field to update your profile");
    } else if (
      error.area !== "" ||
      error.district !== "" ||
      error.doorno !== "" ||
      error.email !== "" ||
      error.landmark !== "" ||
      error.name !== "" ||
      error.phoneNumber !== "" ||
      error.pincode !== "" ||
      error.state !== "" ||
      error.street !== ""
    ) {
      isValid = false;
      toast.error("Please check the error");
    }

    return isValid;
  };

  // Handle Form Submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    toast.dismiss();
    if (!validateForm()) {
      return;
    }

    setLoading(true)

    try {
      const response = await dispatch(updateUserProfile(formData)).unwrap();
  
      if (response) {
        setLoading(false)
        toast.success("Profile updated successfully!",);
        setIsEditing(false)
        setContactEdit(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error || "Failed to update profile",);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setContactEdit(false);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      doorno: user.address.doorno || "",
      street: user.address.street || "",
      landmark: user.address.landmark || "",
      area: user.address.area || "",
      district: user.address.district || "",
      state: user.address.state || "",
      pincode: user.address.pincode || "",
    });
    setError((pre)=>({
      ...pre,
      name: "",
      email: "",
      phoneNumber: "",
      doorno: "",
      street: "",
      landmark: "",
      area: "",
      district: "",
      state: "",
      pincode: "",
    }))
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <div className="personalDetails">
        <Box component="form" sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }} style={{
            color:"black"
          }}>
            Personal Details{" "}
            <span onClick={toggleEdit} style={{
              cursor: 'pointer',
              color: 'blue',
              marginLeft:"10px"
            }}> {isEditing ? "Cancel" : "Edit"}</span>
          </Typography>
          <div
            className="details-form"
            style={{
              color: "white",
            }}
          >
            <TextField
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              onBlur={handleBlur}
              error={!!error.name}
              helperText={error.name}
              required
              inputProps={{ maxLength: 30 }}
              className="tet"
              disabled={!isEditing}
              onKeyDown={(e) => {
                handleDown(e);
                const allowedKeys = [
                  "Backspace",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Tab",
                  " ",
                ];
                const allowedCharPattern = /^[A-Za-z._-]$/;

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
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              disabled={!isEditing}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              onBlur={handleBlur}
              error={!!error.email}
              helperText={error.email}
              required
              className="tet"
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Tab",
                ];
                const allowedCharPattern = /^[0-9a-z._@-]$/;

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
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              onBlur={handleBlur}
              error={!!error.phoneNumber}
              helperText={error.phoneNumber}
              inputProps={{
                maxLength: 10,
              }}
              disabled={!isEditing}
              className="tet"
              required
              onKeyDown={(e) => {
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
          <div className="address">
            <Typography variant="h6" sx={{ mb: 2 }}  style={{
            color:"black"
          }}> 
              Contact Details{" "}
              <span 
            style={{
              cursor: 'pointer',
              color: 'blue',
              marginLeft:"10px"
            }}
                onClick={() => {
                  setContactEdit(!contactEdit);
                  setIsEditing(false);
                  setFormData({
                    username: user.username || "",
                    email: user.email || "",
                    phoneNumber: user.phoneNumber || "",
                    doorno: user.address.doorno || "",
                    street: user.address.street || "",
                    landmark: user.address.landmark || "",
                    area: user.address.area || "",
                    district: user.address.district || "",
                    state: user.address.state || "",
                    pincode: user.address.pincode || "",
                  });
                  setError((pre)=>({
                    ...pre,
                    name: "",
                    email: "",
                    phoneNumber: "",
                    doorno: "",
                    street: "",
                    landmark: "",
                    area: "",
                    district: "",
                    state: "",
                    pincode: "",
                  }))
                }}
              >
                {contactEdit ? "Cancel" : "Edit"}
              </span>
            </Typography>
            <div className="details-forms">
              <TextField
                disabled={!contactEdit}
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
                  const allowedCharPattern = /^[0-9A-Za-z/-]$/;

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
                disabled={!contactEdit}
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
                  const allowedCharPattern = /^[0-9A-Za-z/':;.,()-]$/;
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
                disabled={!contactEdit}
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
                   disabled={!contactEdit}
                label="Land Mark"
                name="landmark"
                error={!!error.landmark}
                helperText={error.landmark}
                value={formData.landmark}
                onChange={handleFormChange}
                inputProps={{ maxLength: 20 }}
                className="test"
                onKeyDown={handleDown}
              />
            </div>
            <div className="details-form">
              <TextField
                disabled={!contactEdit}
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
                disabled={!contactEdit}
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
                disabled={!contactEdit}
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
          </div>
          { isEditing  && (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleSubmit}
              style={{
                backgroundColor:"blue"
              }}
              >
                Submit
              </Button>
            </Box>
          )}


{ contactEdit  && (
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleSubmit}
                style={{
                  backgroundColor:"blue"
                }}
              >
                Submit
              </Button>
            </Box>
          )}

          
        </Box>
      </div>
  <div style={{
    textAlign:"center"
  }}>
    <h2>FAQ</h2>
  </div>
      <div class="faq-container">
        <div class="faq-question">What are the main products or services offered by Shop Cart?</div>
        <div class="faq-answer">Shop Cart offers a variety of products such as electronics, clothing, and home goods.</div>

        <div class="faq-question">How do you approach customer support for your online store?</div>
        <div class="faq-answer">We offer 24/7 customer support via live chat, email, and phone.</div>

        <div class="faq-question">What challenges have you encountered in growing Shop Cart, and how have you overcome them?</div>
        <div class="faq-answer">Managing inventory during high-demand periods was challenging, but we improved our supply chain and integrated real-time stock updates.</div>

        <div class="faq-question">Can you describe your target audience and how you cater to their needs?</div>
        <div class="faq-answer">We cater to tech enthusiasts, fashion lovers, and home decorators with a wide range of high-quality products.</div>

        <div class="faq-question">What are your plans for expanding Shop Cart in the next few years?</div>
        <div class="faq-answer">We aim to expand internationally and introduce new categories like health and wellness.</div>
    </div>
    </div>
  );
};

export default UpdateProfile;
