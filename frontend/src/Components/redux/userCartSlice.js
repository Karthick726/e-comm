import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";

// Async action to fetch user data
export const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/addtocart/get-usercart", { withCredentials: true });
  
      dispatch(setUserCart(response.data.cart));

    } catch (error) {
    
      return rejectWithValue(error.response?.data || "Failed to fetch user cart data");

    }
  });









const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    userCart: null,
  },
  reducers: {
    setUserCart: (state, action) => {
        state.userCart = action.payload; 
      },
  },
 
});


export const { setUserCart } = userCartSlice.actions;

export default userCartSlice.reducer;
