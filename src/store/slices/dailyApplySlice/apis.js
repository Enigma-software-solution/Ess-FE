import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getdailyAppliesApi = createAsyncThunk("dailyApply/get-dailyApply", async (data) => {
  try {
    const response = await api.get("/apply");
    return response;
  } catch (error) {
    throw error;
  }
});

export const createDailyAppliesApi = createAsyncThunk(
  "dailyApply/post-dailyApply",
  async (applyData, { rejectWithValue }) => {
    console.log(applyData, "applyDAta")
    try {
      const response = await api.post("/apply", applyData);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateDailyAppliesApi = createAsyncThunk(
  "dailyApply/patch-dailyApply",
  async (applyId, { rejectWithValue }) => {
    console.log(applyId, "applyId")
    try {
      const response = await api.patch(`/apply/${applyId}`);

      return {applyId};
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const deteleDailyAppliesApi = createAsyncThunk(
  "dailyApply/delete-dailyApply",
  async (applyId, { rejectWithValue }) => {
    console.log(applyId, "applyId")
    try {
      const response = await api.delete(`/apply/${applyId}`);

      return {applyId} ;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

