import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getdailyApplies = createAsyncThunk("dailyApply/get-dailyApply", async (data) => {
  try {
    const response = await api.get("/apply");
    return response;
  } catch (error) {
    throw error;
  }
});

export const postDailyApplies = createAsyncThunk(
  "dailyApply/post-dailyApply",
  async (applyData, { rejectWithValue }) => {
    console.log(applyData, "applyDAta")
    try {
      // Modify this line to send the data to your backend API
      const response = await api.post("/apply", applyData);

      return response.data; // Assuming your API returns data as response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

