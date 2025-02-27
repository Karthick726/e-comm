import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";


export const fetchUserOrder = createAsyncThunk("order/fetchUserOrder", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/order/get-userorder", { withCredentials: true });

      dispatch(setUserOrder(response.data.Order));

    } catch (error) {

      return rejectWithValue(error.response?.data || "Failed to fetch user order data");

    }
  });

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


export const cancelUserOrder = createAsyncThunk(
  "order/cancelUserOrder",
  async (cancelData, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post(
        "/order/cancel-order",
        { cancelData },
        { withCredentials: true }
      );

      dispatch(setUserOrder(response.data));
      if (response.status === 200) {
        toast.success("Order cancel successfully");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to cancle order data"
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
