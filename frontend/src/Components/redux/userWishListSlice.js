import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";

// Async action to fetch user data
export const fetchUserWishList = createAsyncThunk("wishList/fetchUserWishList", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/wishlist/get-userwishlist", { withCredentials: true });
  
      dispatch(setUserWishList(response.data.wishlist));

    } catch (error) {
    
      return rejectWithValue(error.response?.data || "Failed to fetch user  wish list data");

    }
  });









const userWishListSlice = createSlice({
  name: "userWishList",
  initialState: {
    userWishList: null,
  },
  reducers: {
    setUserWishList: (state, action) => {
        state.userWishList = action.payload; 
      },
  },
 
});


export const { setUserWishList } = userWishListSlice.actions;

export default userWishListSlice.reducer;
