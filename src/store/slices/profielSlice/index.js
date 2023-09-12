import {
    createSlice,
  } from "@reduxjs/toolkit";
  import { getProfilesApi } from "./apis";
  
  const initialState = {
    status: "idle",
    error: null,
    data:[]
  };
  
  const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers(builder) {
      builder.addCase(getProfilesApi.pending, (state, action) => {
        state.status = "loading";
      });
  
      builder.addCase(getProfilesApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      });

      builder.addCase(getProfilesApi.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
    },
  
  });
  
  export default profileSlice.reducer;
  