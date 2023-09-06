import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const dailyApplies = createAsyncThunk("dailyApply/get-dailyApply", async (data) => {
    try {
      const response = await api.get("/apply");
      return response;
    } catch (error) {
      throw error;
    }
  });