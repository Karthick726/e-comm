import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";


// Async action to fetch user data
export const fetchaddToCart = createAsyncThunk("addtocard/fetchAddrocard", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/addtocart/get-addtocart", { withCredentials: true });
  
      dispatch(setAddToCard(response.data.cart));

    } catch (error) {
    
      return rejectWithValue(error.response?.data || "Failed to fetch add to card");

    }
  });



  export const addToCartPost = createAsyncThunk("addtocart/postAddtocart", async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/addtocart/post-addtocart", {id}, { withCredentials: true });
  
      dispatch(setAddToCard(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update add to cart");
    }
  });


  export const addToCartUpdate = createAsyncThunk("addtocart/updateAddtocart", async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/addtocart/update-addtocart", {id}, { withCredentials: true });
  
      dispatch(setAddToCard(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update add to cart");
    }
  });


  export const deleteAddToCart = createAsyncThunk("addtocart/deleteAddToCart ", async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/addtocart/deleteAddtocart", {id}, { withCredentials: true });
  
      dispatch(setAddToCard(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  });


  export const deleteWholeAddToCart = createAsyncThunk("addtocart/deleteWholeAddToCart ", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/addtocart/deleteWholeAddtocart", {},{ withCredentials: true });
  
      dispatch(setAddToCard(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  });


const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    addToCart: null,
  },
  reducers: {
    setAddToCard: (state, action) => {
        state.addToCart = action.payload; 
      },
  },
 
});


export const { setAddToCard } = addToCartSlice.actions;

export default addToCartSlice.reducer;
