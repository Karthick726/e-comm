import React, { useState } from "react";
import Header from "../Common/Layout/Header/Header";
import { Link } from "react-router-dom";
import { message } from "antd";
import { MdOutlineDelete } from "react-icons/md";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";
import Loader from "../Common/Layout/Loader/Loader";




const Products = () => {
  const [feature, setFeature] = useState([
    {
      value: "",
      error: "",
    },
  ]);
  const [specification, setSpecification] = useState([
    {
      value: "",
      error: "",
    },
  ]);

  const [category,setCategory]=useState("")

  const [loading,setLoading]=useState(false)
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [originalprice, setOriginalPrice] = useState("");
  const [offerprice, setOfferPrice] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({
    image: "",
    productName:"",
    brandName:"",
    description:"",
    originalprice:"",
    offerprice:"",

  });

//  
const handleCatChange = (event) => {
  setCategory(event.target.value );
};

  //specification
  const addspecificationField = () => {
    if (specification.length >= 10) {
      toast.error("Maximum of 10 specification fields can be added.");
      return;
    }

    const lastField = specification[specification.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error) {
      toast.error("Fix the error in about field");
    } else {
      setSpecification([...specification, { value: "", error: "" }]);
    }
  };

  // Delete About content field
  const deletespecificationField = (index) => {
    if (specification.length <= 1) {
      toast.error("At least one specification field must remain.");
      return;
    }

    const newAbout = [...specification];
    newAbout.splice(index, 1);
    setSpecification(newAbout);
  };

  const handlespecificationBlur = (index, e) => {
    const { value } = e.target;
    const newAbout = [...specification];
    if (value === "") {
      newAbout[index].error = "specification is required.";
    }
    setSpecification(newAbout);
  };

  const handlespecificationChange = (index, e) => {
    const { value } = e.target;
    const newAbout = [...specification];
    newAbout[index].value = value;

    if (value.length < 20) {
      newAbout[index].error = "specification must be at least 20 characters.";
    } else {
      newAbout[index].error = "";
    }

    setSpecification(newAbout);
  };

  //feature
  const addAboutField = () => {
    if (feature.length >= 10) {
      toast.error("Maximum of 10 features fields can be added.");
      return;
    }

    const lastField = feature[feature.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error) {
      toast.error("Fix the error in about field");
    } else {
      setFeature([...feature, { value: "", error: "" }]);
    }
  };

  // Delete About content field
  const deleteAboutField = (index) => {
    if (feature.length <= 1) {
      toast.error("At least one features field must remain.");
      return;
    }

    const newAbout = [...feature];
    newAbout.splice(index, 1);
    setFeature(newAbout);
  };

  const handleAboutBlur = (index, e) => {
    const { value } = e.target;
    const newAbout = [...feature];
    if (value === "") {
      newAbout[index].error = "Features is required.";
    }
    setFeature(newAbout);
  };

  const handleAboutChange = (index, e) => {
    const { value } = e.target;
    const newAbout = [...feature];
    newAbout[index].value = value;

    if (value.length < 20) {
      newAbout[index].error = "Features must be at least 20 characters.";
    } else {
      newAbout[index].error = "";
    }

    setFeature(newAbout);
  };

  //image

  const imageChange = (event) => {
    setImages([]);
    const files = Array.from(event.target.files);
    let totalSize = images.reduce((acc, img) => acc + img.size, 0); // Get existing images' total size

    files.forEach((selectedFile) => {
      if (selectedFile) {
        const fileType = selectedFile.type;
        if (fileType.startsWith("image/")) {
          if (totalSize + selectedFile.size > 5 * 1024 * 1024) {
            // 5MB limit
            setErrors((prev) => ({
              ...prev,
              images: "Total image size should not exceed 5MB",
            }));
            return;
          }

          totalSize += selectedFile.size;

          const reader = new FileReader();
          reader.onload = function () {
            setImages((prev) => [...prev, selectedFile]);
          };
          reader.readAsDataURL(selectedFile);

          setErrors((prev) => ({ ...prev, images: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            images: "Please select an image file",
          }));
        }
      }
    });
  };

  //handleBlur

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setErrors((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };
  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "description") {
      if (fieldValue.length < 50) {
        message = "Please enter a valid description";
      } else {
        message = "";
      }
    }

    if (fieldName === "productName") {
      if (fieldValue.length < 5) {
        message = "Please enter a valid product name";
      } else {
        message = "";
      }
    }

    if (fieldName === "brandName") {
      if (fieldValue.length < 3) {
        message = "Please enter a valid Brand name";
      } else {
        message = "";
      }
    }

    if (fieldName === "originalprice") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 2) {
        message = "Original Price needs 2 characters";
      } else if (numericValue.length > 10) {
        message = "Original Price is too long";
      } else {
        message = "";
      }
    }

    if (fieldName === "offerprice") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 2) {
        message = "Offer Price needs 2 characters";
      } else if (numericValue.length > 10) {
        message = "Offer Price is too long";
      } else {
        message = "";
      }
    }

    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setErrors((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    if (name === "productName") {
      setProductName(value);
    } else if (name === "brandName") {
      setBrandName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "originalprice") {
      setOriginalPrice(value);
    } else {
      setOfferPrice(value);
    }
  };

const validateForm=()=>{
  let isValid = true;

  if(images.length === 0){
    toast.error("please Upload the image")
    isValid = false;
  }else if(productName ==="" || brandName ==="" || originalprice==="" || description ==="" ){
    toast.error("Please fill   all the fields")
    isValid = false;
  }else if(feature.some((value)=>value.value==="")){
    toast.error("Please fill   all the fields")
    isValid = false;
  }else if(specification.some((value)=>value.value==="")){
    toast.error("Please fill  all the fields")
    isValid = false;
  }else if(errors.brandName !=="" || errors.description !=="" || errors.image !=="" || errors.offerprice !=="" || errors.productName !==""){
    toast.error("Please check  error  the fields")
    isValid = false;
  }else if(feature.some((value)=>value.error !=="")){
    toast.error("Please check  error  the fields")
    isValid = false;
  }else if(specification.some((value)=>value.error !=="")){
    toast.error("Please check   error  the fields")
    isValid = false;

  }else if(category===""){
    toast.error("Please select category  the fields");
    isValid = false;
  }else if(Number(originalprice) > 100000){
    toast.error("Please enter the correct price  the fields");
    isValid = false;

  }else if (Number(offerprice)>Number(originalprice)){
    toast.error(" Offer Price must be lower than original price");
    isValid = false;
  }else if (images.length > 7){
    toast.error("Please select only 7 the image");
    isValid = false;
  }else{
    isValid= true;
  }

  return isValid

}


  //submit
  const handleSubmit =async()=>{
    toast.dismiss()
    if(!validateForm()){
      return
    }else{
      setLoading(true)
      const formData=new FormData();
      formData.append("productname",productName);
      formData.append("category",category)
      formData.append("brandname",brandName);
      formData.append("offerprice",offerprice);
      formData.append("originalprice",originalprice);
      formData.append("description",description);
      images.forEach((image)=>{
        formData.append("images",image)
      })
      feature.forEach((value)=>{
        formData.append("feature",value.value)
      })
      
      specification.forEach((value)=>{
        formData.append("specification",value.value)
      })

      try {
        const response=await client.post("/product/add-product",formData,{
          withCredentials:true
        })
        if(response.status===200){
          setLoading(false)
          toast.success("Product Added Successfully")
          setProductName("");
          setBrandName("");
          setOfferPrice("");
          setOriginalPrice("");
          setDescription("");
          setImages([]);
          setCategory("")
          setFeature([{
            value: "",
            error: "",
          },]);
          setSpecification([
            {
              value: "",
              error: "",
            },
          ]);
          

        }
      } catch (error) {
        setLoading(false)
        if(error.response.status===401){
          toast.error("You are not authorized to add product")
        }else{
          toast.error("Failed to add product")
        }
        
      }
    }

  }


  console.log(category)
  return (
    <div>
      <Header />
      <div className="container"></div>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Add Products</li>
            </ol>
          </nav>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <Box
                sx={{ padding: 4 }}
                className="product-add-from-container"
                style={{
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  className="text-center mb-5"
                >
                  Add New Product
                </Typography>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleCatChange}
        >
          <MenuItem value={"Laptop & Computers"}>Laptop & Computers</MenuItem>
          <MenuItem value={"Smartphones & Tablets"}>Smartphones & Tablets</MenuItem>
          <MenuItem value={"Headphones & Earphones"}>Headphones & Earphones</MenuItem>
          <MenuItem value={"Smartwatches & Wearables"}>Smartwatches & Wearables</MenuItem>
          <MenuItem value={"Cameras & Accessories"}>Cameras & Accessories</MenuItem>
          <MenuItem value={"Power Banks & Chargers"}>Power Banks & Chargers</MenuItem>
        </Select>
      </FormControl>

                <TextField
                  label="Product Name"
                  name="productName"
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      maxLength: 90,
                    },
                  }}
                  margin="normal"
                  value={productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={!!errors.productName}
                  helperText={errors.productName}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[A-Za-z.,_()-]$/;
                    if (productName.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                <TextField
                  label="Brand Name"
                  slotProps={{
                    htmlInput: {
                      maxLength: 20,
                    },
                  }}
                  name="brandName"
                  fullWidth
                  margin="normal"
                  value={brandName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={!!errors.brandName}
                  helperText={errors.brandName}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[A-Za-z.,_()-]$/;
                    if (brandName.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                <TextField
                  label="Original Price"
                  name="originalprice"
                  slotProps={{
                    htmlInput: {
                      maxLength: 6,
                    },
                  }}
                  fullWidth
                  margin="normal"
                  value={originalprice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={!!errors.originalprice}
                  helperText={errors.originalprice}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[0-9-]$/;
                    if (originalprice.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                <TextField
                  label="Offer Price"
                  name="offerprice"
                  fullWidth
                  required
                  slotProps={{
                    htmlInput: {
                      maxLength: 5,
                    },
                  }}
                  margin="normal"
                  value={offerprice}
                  onChange={handleChange}
                  error={!!errors.offerprice}
                  helperText={errors.offerprice}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                      " ",
                    ];
                    const allowedCharPattern = /^[0-9-]$/;
                    if (offerprice.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                    if (
                      !allowedKeys.includes(e.key) &&
                      !allowedCharPattern.test(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />

                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={4}
                  margin="normal"
                  error={!!errors.description}
                          helperText={errors.description}
                          onKeyDown={(e) => {
                          
                            if (description.length === 0 && e.key === " ") {
                              e.preventDefault();
                              return;
                            }
        
                        
                          }}
                />

                <Box marginBottom={2}>
                  <Typography variant="h6">Products Features *</Typography>
                  <div>
                    {feature.map((field, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <TextField
                          className="mt-2"
                          label={`Feature ${index + 1}`}
                          fullWidth
                          variant="outlined"
                          slotProps={{
                            htmlInput: {
                              maxLength: 200,
                            },
                          }}
                          rows={2}
                          multiline
                          value={field.value}
                          onChange={(e) => handleAboutChange(index, e)}
                          onBlur={(e) => handleAboutBlur(index, e)}
                          error={!!field.error}
                          helperText={field.error}
                          onKeyDown={(e) => {
                          
                            if (field.value.length === 0 && e.key === " ") {
                              e.preventDefault();
                              return;
                            }
        
                        
                          }}
                        />
                        <button
                          className="bg-danger p-1 fs-4 text-light mt-2"
                          onClick={() => deleteAboutField(index)}
                          disabled={feature.length <= 1}
                          style={{
                            marginLeft: "8px",
                            cursor:
                              feature.length === 1 ? "not-allowed" : "pointer",
                            borderRadius: "5px",
                            backgroundColor:
                              feature.length === 1 ? "#ccc" : "#dc3545",
                            border:
                              feature.length === 1 ? "1px solid #ddd" : "none",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <MdOutlineDelete />
                        </button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={addAboutField}
                    >
                      Add Features
                    </Button>
                  </div>
                </Box>

                <Box marginBottom={2}>
                  <Typography variant="h6">Products specification *</Typography>
                  <div>
                    {specification.map((field, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <TextField
                          className="mt-2"
                          label={`specification ${index + 1}`}
                          fullWidth
                          variant="outlined"
                          slotProps={{
                            htmlInput: {
                              maxLength: 100,
                            },
                          }}
                          rows={2}
                          multiline
                          value={field.value}
                          onChange={(e) => handlespecificationChange(index, e)}
                          onBlur={(e) => handlespecificationBlur(index, e)}
                          error={!!field.error}
                          helperText={field.error}
                          onKeyDown={(e) => {
                          
                            if (field.value.length === 0 && e.key === " ") {
                              e.preventDefault();
                              return;
                            }
        
                        
                          }}
                        />
                        <button
                          className="bg-danger p-1 fs-4 text-light mt-2"
                          onClick={() => deletespecificationField(index)}
                          disabled={specification.length <= 1}
                          style={{
                            marginLeft: "8px",
                            cursor:
                              specification.length === 1
                                ? "not-allowed"
                                : "pointer",
                            borderRadius: "5px",
                            backgroundColor:
                              specification.length === 1 ? "red" : "red",
                            border:
                              specification.length === 1
                                ? "1px solid #ddd"
                                : "none",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <MdOutlineDelete />
                        </button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={addspecificationField}
                    >
                      Add Feature
                    </Button>
                  </div>
                </Box>

                <Box marginBottom={2} style={{ overflow: "hidden" }}>
                  <Typography variant="h6">Upload Images *</Typography>

                  <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, image/jpg"
                    className="mt-2"
                    onChange={imageChange}
                  />

                  {errors.image && (
                    <div
                      style={{
                        color: "red",
                        marginLeft: "20px",
                        fontSize: "13px",
                      }}
                    >
                      {errors.image}
                    </div>
                  )}
                </Box>

                <div className="d-flex justify-content-center">
                  <Button variant="outlined" sx={{ m: 2 }} onClick={handleSubmit}>
                    Submit Products
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </main>
      {loading && <Loader/>}
    </div>
  );
};

export default Products;
