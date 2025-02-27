import React, { use, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../Home/UserLogin/UserContext";
import { fetchUserCart } from "../../redux/userCartSlice";
import { fetchUser } from "../../redux/userSlice";
import { fetchProducts } from "../../redux/productSlice";
import wish from "../../../Assets/Images/wish.png";
import { IoMdAddCircleOutline } from "react-icons/io";

import { GrSubtractCircle } from "react-icons/gr";
import {
  addToCartPost,
  addToCartUpdate,
  deleteAddToCart,
} from "../../redux/addtoCardSlice";
import toast from "react-hot-toast";

const CartDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { addToCart } = useSelector((state) => state.addToCart);
  const { userDetails } = useContext(UserContext);
  const { user } = useSelector((state) => state.user);
  const { userCart } = useSelector((state) => state.userCart);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token === undefined) {
      navigate("/account");
    } else {
      dispatch(fetchUserCart());
      dispatch(fetchUser());
      dispatch(fetchProducts());
    }
  }, [dispatch]);

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

  const handleCheckOut = () => {
    if (userTotalPrice > 100000) {
      toast.dismiss();
      toast.error("Cannot add more than 100000");
    } else {
      navigate("/checkout", {
        state: { userCarts: userCart },
      });
    }
  };

  return (
    <div className="container con  mt-2">
      <div className="row">
        {userCart?.length > 0 ? (
          <div className="col-lg-9 col-12">
            <div className="col-lg-12 mb-4 "></div>
            {userCart.map((item, index) => (
              <div key={index} className="col-lg-12 mb-4 ">
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
                      onClick={() => handleNavigate(item.product._id)}
                      src={item.product.image[0]}
                      alt={item.product.productName}
                      className="card-img-top"
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        width: "200px",
                      }}
                    />
                    <div className="card-body" style={{ cursor: "pointer",width:"50%" }}>
                      <h5
                        className="card-title"
                        onClick={() => handleNavigate(item.product._id)}
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
                          {Math.round(item.product.percentage)}% Offer
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
                        disabled={item.addToCart.quantity <= 1}
                      >
                        <GrSubtractCircle />
                      </button>
                      <p className="cart-quantity">{item.addToCart.quantity}</p>
                      <button
                        style={{
                          backgroundColor: "white",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                        disabled={item.addToCart.quantity >= 5}
                        onClick={() => {
                          handleAddToCart(item.product._id);
                        }}
                        className="cart-btn"
                      >
                        <IoMdAddCircleOutline />
                      </button>
                    </div>
                    <div>
                      <p>
                        <span className="card-title">Total Price :</span>{" "}
                        <span className="text-danger fw-bold">
                          ₹ {item.product.offerPrice * item.addToCart.quantity}
                        </span>
                      </p>
                    </div>
                    <div className="buttons wish">
                      <button
                        className="buy-now"
                        style={{
                          height: "50px",
                        }}
                        onClick={() => {
                          handleRemoveFromCart(item.product._id);
                        }}
                      >
                        <MdDelete
                          style={{
                            fontSize: "30px",
                          }}
                        />{" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="col-12 text-center wishlist"
            style={{
              flexDirection: "column",
            }}
          >
            <img src={wish} />
            <p className="text-muted">Your cart is empty.</p>
            <button
              className="btn"
              onClick={() => navigate("/products")}
              style={{
                backgroundColor: "#FFC107",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Start Shopping
            </button>
          </div>
        )}

        {userCart?.length > 0 && (
          <div className="col-lg-3 col-12 mt-4">
            <div
              className="card shadow-sm p-3 rounded"
              style={{ position: "sticky", top: "16%" }}
            >
              <div className="card-body">
                <h4 className="card-title mb-3 text-center fw-bold">
                  Card Summary
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
                        (item.product.originalPrice - item.product.offerPrice) *
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
                  onClick={handleCheckOut}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetails;
