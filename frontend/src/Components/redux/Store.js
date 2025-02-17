import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import productReducer from './productSlice'
import wishListReducer from './wishList'
import addToCartReducer from './addtoCardSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products:productReducer,
    wishList:wishListReducer,
    addToCart:addToCartReducer,
  },
});

export default store;
