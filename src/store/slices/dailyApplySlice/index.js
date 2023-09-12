import {
  createSlice,
} from "@reduxjs/toolkit";
import {   createDailyAppliesApi, deteleDailyAppliesApi, getdailyAppliesApi, updateDailyAppliesApi } from "./apis";


const initialState = {
  status: "idle",
  error: null,
  data:[],
  selectedApply:{}
};


const dailyApplySlice = createSlice({
  name: "dailyApply",
  initialState,

  reducers: {
    setSelectedApply(state, action) {
      state.selectedApply = action.payload;
    },
  
  },

  extraReducers(builder) {
    builder.addCase(getdailyAppliesApi.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getdailyAppliesApi.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });

    builder.addCase(getdailyAppliesApi.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(createDailyAppliesApi.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = [...state?.data , action?.payload?.data];
    });

    builder.addCase(deteleDailyAppliesApi.fulfilled, (state, action) => {
      state.data = state?.data?.filter((apply)=> apply?._id !== action?.payload?.applyId)
    });
  },

});
export const {setSelectedApply} = dailyApplySlice.actions;

export default dailyApplySlice.reducer;
