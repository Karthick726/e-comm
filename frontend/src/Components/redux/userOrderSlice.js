import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";

// Async action to fetch user data
// export const fetchUserWishList = createAsyncThunk("wishList/fetchUserWishList", async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await client.get("/wishlist/get-userwishlist", { withCredentials: true });

//       dispatch(setUserWishList(response.data.wishlist));

//     } catch (error) {

//       return rejectWithValue(error.response?.data || "Failed to fetch user  wish list data");

//     }
//   });

export const postUserOrder = createAsyncThunk(
  "order/postUserOrder",
  async (formDatas, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post(
        "/order/add-order",
        { formDatas },
        { withCredentials: true }
      );

      dispatch(setUserOrder(response.data));
      if (response.status === 200) {
        toast.success("Order placed successfully");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to post order data"
      );
    }
  }
);

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    userOrder: null,
  },
  reducers: {
    setUserOrder: (state, action) => {
      state.userOrder = action.payload;
    },
  },
});

export const { setUserOrder } = userOrderSlice.actions;

export default userOrderSlice.reducer;
