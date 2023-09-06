import {
  createSlice,
} from "@reduxjs/toolkit";
import {  dailyApplies } from "./apis";


const initialState = {
  status: "idle",
  error: null,
  dailyApply:[]
};


const dailyApplySlice = createSlice({
  name: "dailyApply",
  initialState,
  extraReducers(builder) {
    builder.addCase(dailyApplies.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(dailyApplies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.dailyApply = action.payload;
    });

    builder.addCase(dailyApplies.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },

});

export default dailyApplySlice.reducer;
