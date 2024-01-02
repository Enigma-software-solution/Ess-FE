import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getDailyProjectUpdateApi = createAsyncThunk("user-daily-updates/get-user-daily-updates", async (params) => {
  try {
    const response = await api.get(`/user-daily-updates?${params}`);
    return response;
  } catch (error) {
    throw error;
  }
});


export const createDailyProjectUpdateApi = createAsyncThunk(
  "user-daily-updates/post-user-daily-updates",
  async (userDailyUpdateData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user-daily-updates", userDailyUpdateData);
      toast.success(response?.message)
      return response;
    } catch (error) {
      toast.error(error?.message)
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateDailyUpdate = createAsyncThunk(
  "user-daily-updates/user-daily-updates-newchanges",
  async (data, { rejectWithValue }) => {
      try {
          const response = await api.patch(`/user-daily-updates/${data?.id}`, data?.data);
          toast.success("daily update Updated Successfully")

          return response;
      } catch (error) {
          toast.error(error.message)
          return rejectWithValue(error?.response?.data || "An error occurred");
      }
  }
);

export const deteleDailyProjectUpdatesApi = createAsyncThunk(
  "user-daily-updates/delete-user-daily-updates",
  async (projectDailyUpdateId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/user-daily-updates/${projectDailyUpdateId}`);
      toast.success("ProjectDailyUpdate deleted Successfully")

      return { projectDailyUpdateId };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);