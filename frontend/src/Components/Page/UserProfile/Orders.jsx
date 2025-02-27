import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelUserOrder, fetchUserOrder } from "../../redux/userOrderSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
} from "@mui/material";

import empty from "../../../Assets/Images/wish.png"
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOrder } = useSelector((state) => state.userOrder);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState([]);
  const [cancelMessage, setCancelMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  const orderStatusOptions = ["All", "Processing", "Delivered", "Cancelled"];
  const cancellationReasons = [
    "Wrong Address",
    "Wrong Product",
    "Changed Mind",
    "Found Better Price",
    "Delay in Delivery",
    "Other",
  ];


  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
  
    // Format date as: Feb 21, 2025
    const formattedDate = date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  
    // Format time as: 6:58 AM
    const formattedTime = date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    });
  
    return `${formattedDate} ${formattedTime}`;
  };

  
  const filteredOrders =
    userOrder?.length >= 0 &&
    userOrder?.filter(
      (order) => filter === "All" || order.orderItems.orderStatus === filter
    );

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCancelReason([]);
    setCancelMessage("");
  };

  const handleReasonChange = (reason) => {
    setCancelReason((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSubmitCancel = async () => {

    if(cancelReason.length ===0){
      toast.error("Can you select the cancel reason")

    }else{
    const cancelData = {
      _id: selectedOrder.orderItems._id,
      reason: cancelReason.join(", "),
      message: cancelMessage,
    };

    await dispatch(cancelUserOrder(cancelData));
    await dispatch(fetchUserOrder());
    handleClose();
  }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "10px",
          flexWrap: "wrap",
          borderBottom: "1px solid lightgray",
        }}
      >
        {" "}
        <h2>My Orders</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "300px",
            marginBottom: "10px",
          }}
        >
          {orderStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="orders-list">
        {filteredOrders?.length > 0 ? (
          filteredOrders?.map((order) => (
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
                    onClick={() => handleNavigate(order.product_Info._id)}
                    src={order.product_Info.image[0]}
                    alt={order.product_Info.image[0]}
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
                      {order.product_Info.productName}
                    </h5>
                    <p className="text-muted">
                      Brand: {order.product_Info.brandName}
                    </p>
                    <p className="text-danger fw-bold">
                      ₹{order.product_Info.offerPrice}
                      <span className="original-prices">
                        {" "}
                        ₹ {order.product_Info.originalPrice}
                      </span>
                      <span className="offer">
                        {Math.round(order.product_Info.percentage)}% Offer
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
                  <div className="cart-item" >
                  <p>
                    <span className="card-title" style={{
                      width:"100px",
                      color:"green"
                    }}>
                    Order By :{formatDateTime(order.orderItems.placedAt)}
                    </span>{" "}
                  </p>
                </div>
                  <div className="cart-item">
                    <p>
                      <span className="card-title">
                        Quantity :{order.orderItems.quantity}
                      </span>{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="card-title">
                        Total Price :{order.orderItems.price}
                      </span>{" "}
                    </p>
                  </div>
                  {order.orderItems.orderStatus === "Processing" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCancel(order)}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {order.orderItems.orderStatus === "Delivered" && (
                    <span className="offer">Delivered</span>
                  )}



                

{order.orderItems.orderStatus === "Cancelled" && (
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    gap:"10px",
    flexDirection:"column"
  }}>

                    <span className="offer" style={{
                      color:"red"
                    }}>Cancelled</span> 
                    
                    <span className="offer" style={{
                      color:"red"
                    }}>Cancelled On: {formatDateTime(order.orderItems.cancelDetails.date)}</span>
                     </div>
                  )}
                  </div>
                </div>
              </div>
          ))
        ) : (
          <div className="empty-orders">
  <img src={empty} alt="No Orders" className="empty-icon" />
  <p className="empty-text">No orders found for this category.</p>
</div>

        )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <h5 className="card-title">choose Reason</h5>
          {cancellationReasons.map((reason) => (
            <FormControlLabel
              key={reason}
              control={
                <Checkbox
                  checked={cancelReason.includes(reason)}
                  onChange={() => handleReasonChange(reason)}
                />
              }
              label={reason}
            />
          ))}

          <h5 className="card-title">Message</h5>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Additional Message"
            value={cancelMessage}
            onChange={(e) => setCancelMessage(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleSubmitCancel}
            color="error"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
