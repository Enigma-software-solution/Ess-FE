import {
    createSlice,
  } from "@reduxjs/toolkit";
  import { loginUser, refresh } from "./apis";
  
  
  const initialState = {
    user:JSON.parse(localStorage.getItem("user")),
    status: "idle",
    error: null,
    token: localStorage.getItem("token") || null,
  };
  
  
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers(builder) {
      builder.addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      });
  
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload?.token;
        localStorage.setItem("token", action.payload.token); 
        localStorage.setItem("refresh_token", action.payload.refresh_token); 
      });
  
      builder.addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });

      builder.addCase(refresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload?.token;
        localStorage.setItem("token", action.payload.token); 
      });

    },
    reducers: {
      updateUser(state, action) {
        state.user = action.payload;
      },
      // logout(state) {
      //   state.token = null;
      //   state.user = null;
      // },
    },
  });
  
  export const {updateUser} = authSlice.actions;
  export default authSlice.reducer;