import {
  createSlice,
} from "@reduxjs/toolkit";
import { createProfileApi, getProfilesApi } from "./apis";

const initialState = {
  status: "idle",
  error: null,
  data: []
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

    builder.addCase(createProfileApi.fulfilled, (state, action) => {
      console.log(action.payload, "actionssssss")
      state.status = "succeeded";
      state.data = [action?.payload?.data, ...state?.data];
    });
  },

});

export default profileSlice.reducer;
