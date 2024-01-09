import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getProfilesApi = createAsyncThunk("profile/get-profile", async () => {
  try {
    const response = await api.get("/profile");
    return response;
  } catch (error) {
    throw error;
  }
});


export const createProfileApi = createAsyncThunk(
  "profile/post-profile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post("/profile", profileData);
      toast.success(response?.message)
      return response;
    } catch (error) {
      toast.warn(error.response.data.message || error?.message)
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updateProfileApi = createAsyncThunk(
  "profile/patch-profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/profile/${data.id}`, data?.data);
      toast.success("Profile Updated Successfully")

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);




export const deteleProfileApi = createAsyncThunk(
  "profile/delete-profile",
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/profile/${profileId}`);
      toast.success("Profile deleted Successfully")

      return { profileId };
    } catch (error) {
      toast.error(error.message)
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);


