import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getdailyAppliesApi = createAsyncThunk("dailyApply/get-dailyApply", async (q) => {
  try {
    const response = await api.get(`/apply?${q}`);
    return response;
  } catch (error) {
    throw error;
  }
});


export const createDailyAppliesApi = createAsyncThunk(
  "dailyApply/post-dailyApply",
  async (applyData, { rejectWithValue }) => {
    try {
      const response = await api.post("/apply", applyData);
      toast.success(response?.message)
      return response;
    } catch (error) {
      toast.warn(error.response.data.message || error?.message)
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateDailyAppliesApi = createAsyncThunk(
  "dailyApply/patch-dailyApply",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/apply/${data.id}`, data.data);
      toast.success("Apply Updated Successfully")

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const deteleDailyAppliesApi = createAsyncThunk(
  "dailyApply/delete-dailyApply",
  async (applyId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/apply/${applyId}`);
      toast.success("Apply deleted Successfully")

      return { applyId };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);


export const getDailyApplyStats = createAsyncThunk("dailyApply/get-dailyApply-stats", async (q) => {
  try {
    const response = await api.get(`/apply/stats`);
    return response;
  } catch (error) {
    throw error;
  }
});


export const uploadFile = createAsyncThunk(
  "dailyApply/upload-dailyApply",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/apply/upload", data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred during file upload");
    }
  }
);