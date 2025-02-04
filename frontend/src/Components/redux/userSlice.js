import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../Common/Client/Client";
import toast from "react-hot-toast";

// Async action to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get("/user/get-user", { withCredentials: true });
  
      dispatch(setUser(response.data));
  
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user data");
    }
  });

  export const updateUserProfile = createAsyncThunk("user/updateProfile", async (updatedData, { dispatch, rejectWithValue }) => {

    console.log("updateData",updatedData)
    try {
      const response = await client.post("/user/update-profile", updatedData, { withCredentials: true });
  
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  });

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload; 
      },
  },
 
});


export const { setUser } = userSlice.actions;

export default userSlice.reducer;
