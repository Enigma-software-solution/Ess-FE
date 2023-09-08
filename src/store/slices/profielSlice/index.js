import {
    createSlice,
  } from "@reduxjs/toolkit";
  import { getProfiles } from "./apis";
  
  const initialState = {
    status: "idle",
    error: null,
    data:[]
  };
  
  const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers(builder) {
      builder.addCase(getProfiles.pending, (state, action) => {
        state.status = "loading";
      });
  
      builder.addCase(getProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      });

      builder.addCase(getProfiles.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
    },
  
  });
  
  export default profileSlice.reducer;
  