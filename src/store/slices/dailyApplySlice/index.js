import {
  createSlice,
} from "@reduxjs/toolkit";
import {  getdailyApplies } from "./apis";


const initialState = {
  status: "idle",
  error: null,
  data:[]
};


const dailyApplySlice = createSlice({
  name: "dailyApply",
  initialState,
  extraReducers(builder) {
    builder.addCase(getdailyApplies.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getdailyApplies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });

    builder.addCase(getdailyApplies.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },

});

export default dailyApplySlice.reducer;
