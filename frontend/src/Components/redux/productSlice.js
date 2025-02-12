import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";

// Async action to fetch user data
export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/product/get-products", { withCredentials: true });
  
      if(response.status===200){
        dispatch(setProducts(response.data));
        return response.data
      }

  
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user data");
    }
  });


  const productSlice = createSlice({
    name: "products",
    initialState: {
      products: [],
    },
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload;  
        },
    },
   
  });
  
  
  export const { setProducts } = productSlice.actions;
  
  export default productSlice.reducer;