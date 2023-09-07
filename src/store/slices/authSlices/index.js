import {
  createSlice,
} from "@reduxjs/toolkit";
import { loginUser } from "./apis";


const initialState = {
  user: {},
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
      localStorage.setItem("token", action.payload.token); // Store token in local storage
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
  // reducers: {
  //   login(state, action) {
  //     state.isAuthenticated = true;
  //     state.user = action.payload;
  //   },
  //   logout(state) {
  //     state.isAuthenticated = false;
  //     state.user = null;
  //   },
  // },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
