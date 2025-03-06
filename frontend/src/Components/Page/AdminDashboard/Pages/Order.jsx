import React, { useEffect, useState } from "react";
import Header from "../Common/Layout/Header/Header";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import client from "../../../Common/Client/Client";
import toast from "react-hot-toast";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("Processing");
    const [trackId, setTrackId] = useState("");

  const [errors, setErrors] = useState({
    trackId:""
  })

  useEffect(() => {
    getFullOrder();
  }, []);

  const orderStatusOptions = ["Processing", "Shipped", "Delivered"];

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "tarckId") {
      if (fieldValue.length < 12) {
        message = "Please enter a valid tarckId";
      } else {
        message = "";
      }
    }

    return{message:message}

  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      const err = errorMessage(name, value).message;
  
      setErrors((prevError) => ({
        ...prevError,
        [name]: err,
      }));
     

      setTrackId(value)
    };

  const getFullOrder = async () => {
    try {
      const response = await client.get("/order/get-fullorder", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleSubmit=async(productId,checkId)=>{
    console.log("orderpage",filter,trackId)
    if(filter==="Processing"){
      toast.error("Already a processing")
    }else if(filter==="Shipped" && trackId===""){
      toast.error("Please enter the trackid")
    }else {
      try {
        const response = await client.post("/order/submit", {
          filter,trackId,productId,checkId
        },{withCredentials:true})
        if (response.status === 200) {
          toast.success("Order submitted successfully");
          getFullOrder();
          }
      }catch(err){
        console.log(err)
      }
    }
  }


  console.log("ordewr",order)

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
              <li className="breadcrumb-item active">Order</li>
            </ol>
          </nav>
        </div>
        <div className="container cons mt-5">
          <div className="row">
            <Box
              sx={{ padding: 4 }}
              className="product-add-from-container"
              style={{ backgroundColor: "white" }}
            >
              <div className="table-responsive">
                <table className="table table-striped text-center table-bordered" >
                  <thead>
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th
                        scope="col"
                        style={{
                          width: "150px",
                        }}
                      >
                        Track Id
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((orderItem, orderIndex) => (
                      <React.Fragment key={orderIndex}>
                        {orderItem.orderItems.map((item, itemIndex) => (
                          <tr key={`${orderIndex}-${itemIndex}`}>
                            {itemIndex === 0 && (
                              <>
                                <td
                                  rowSpan={orderItem.orderItems.length}
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle", // Centers vertically
                                  }}
                                >
                                  {orderItem.userDetails.username}
                                </td>
                                <td
                                  rowSpan={orderItem.orderItems.length}
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle", // Centers vertically
                                  }}
                                >
                                  {orderItem.userDetails.email}
                                </td>
                              </>
                            )}
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                              {item.orderStatus === "Cancelled" ? (
                                <span>
                                  <p style={{ color: "red" }}>
                                    Reason: {item.cancelDetails.reason}
                                  </p>
                                  <p style={{ color: "red" }}>
                                    Date:{" "}
                                    {formatDateTime(item.cancelDetails.date)}
                                  </p>
                                </span>
                              ) : (
                                <select
                                  value={filter==="Processing"  ? item.orderStatus : filter}
                                  onChange={(e) => setFilter(e.target.value)}
                                  className="form-select"
                                  style={{
                                    borderColor: "lightgray",
                                  }}

                                  disabled={
                                    item.orderStatus === "Cancelled" || item.orderStatus === "Delivered"
                                  }
                                >
                                  {orderStatusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </td>
                            <td
                              style={{
                                width: "25%",
                              }}
                            >
                              {item.trackId === "" ? (
                                <div className="mb-3">
                                  <TextField
                                   slotProps={{
                                    htmlInput: {
                                      maxLength:12,
                                    },
                                  }}
                                   value={trackId}
                                   onChange={handleChange}
                                   required
                                   error={!!errors.trackId}
                                   helperText={errors.trackId}
                                   onKeyDown={(e) => {
                                     const allowedKeys = [
                                       "Backspace",
                                       "ArrowLeft",
                                       "ArrowRight",
                                       "Delete",
                                       "Tab",
                                       " ",
                                     ];
                                     const allowedCharPattern = /^[A-Za-z 0-9.,_()-]$/;
                                     if (trackId.length === 0 && e.key === " ") {
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
                                    type="text"
                                    name="trackId"
                                    placeholder="Track Id"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    style={{
                                      borderColor: "lightgray",
                                    }}
                                  />
                                </div>
                              ) : (
                                <span
                                  style={{
                                    color: "green",
                                  }}
                                >
                                  {item.trackId}
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                style={{
                                  backgroundColor: "blue",
                                }}
                                onClick={()=>handleSubmit(item._id,orderItem._id)}

                                disabled={
                                  item.orderStatus === "Cancelled" || item.orderStatus === "Delivered"
                                }
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-info btn-sm"
                                style={{
                                  backgroundColor: "lightblue",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#orderDetailsModal"
                                onClick={() =>
                                  setSelectedOrder({
                                    orderItem: orderItem.userDetails,
                                    item,
                                  })
                                }
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
          </div>
        </div>
      </main>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="orderDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <div className="row">
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
                        <div className="order-details-container">
                          {/* User & Order Info */}
                          <div className="order-info">
                            <p>
                              <strong>User:</strong>{" "}
                              {selectedOrder.orderItem.username}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {selectedOrder.orderItem.email}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {selectedOrder.item.address}
                            </p>
                          </div>
                        </div>
                        <img
                          src={selectedOrder.item.productDetails.image[0]}
                          alt={selectedOrder.item.productDetails.image[0]}
                          className="card-img-top"
                          style={{
                            cursor: "pointer",
                            height: "200px",
                            width: "200px",
                          }}
                        />
                        <div
                          className="card-body"
                          style={{ cursor: "pointer", width: "50%" }}
                        >
                          <h5 className="card-title">
                            {selectedOrder.item.productDetails.productName}
                          </h5>
                          <p className="text-muted">
                            Brand: {selectedOrder.item.productDetails.brandName}
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
                          <p>
                            <span
                              className="card-title"
                              style={{
                                width: "100px",
                                color: "green",
                              }}
                            >
                              Order By :
                              {formatDateTime(selectedOrder.item.placedAt)}
                            </span>{" "}
                          </p>
                        </div>
                        <div className="cart-item">
                          <p>
                            <span className="card-title">
                              Quantity :{selectedOrder.item.quantity}
                            </span>{" "}
                          </p>
                        </div>
                        <div className="cart-item">
                          <p>
                            <span className="card-title">
                              Price :{selectedOrder.item.price}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
