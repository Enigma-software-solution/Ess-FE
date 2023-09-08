import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getProfiles = createAsyncThunk("profile/get-profile", async () => {
    try {
      const response = await api.get("/profile");
      return response;
    } catch (error) {
      throw error;
    }
  });

