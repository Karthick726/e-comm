import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import productReducer from './productSlice'
import wishListReducer from './wishList'
import addToCartReducer from './addtoCardSlice'
import userWishListReducer from "./userWishListSlice";
import userCartReducer from "./userCartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products:productReducer,
    wishList:wishListReducer,
    addToCart:addToCartReducer,
    userWishList:userWishListReducer,
    userCart:userCartReducer,
  },
});

export default store;
