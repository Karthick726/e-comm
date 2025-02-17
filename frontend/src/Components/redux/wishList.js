import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";

// Async action to fetch user data
export const fetchWishList = createAsyncThunk("wishList/fetchWishList", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/wishlist/get-wishlist", { withCredentials: true });
  
      dispatch(setWishList(response.data));

    } catch (error) {
    
      return rejectWithValue(error.response?.data || "Failed to fetch user data");

    }
  });



  export const updateWishList = createAsyncThunk("wishList/updateWishList", async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/wishlist/add-wishlist", {id}, { withCredentials: true });
  
      dispatch(setWishList(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  });



  export const deleteWishList = createAsyncThunk("wishList/deleteWishList", async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/wishlist/delete-wishlist", {id}, { withCredentials: true });
  
      dispatch(setWishList(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  });

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishList: null,
  },
  reducers: {
    setWishList: (state, action) => {
        state.wishList = action.payload; 
      },
  },
 
});


export const { setWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
