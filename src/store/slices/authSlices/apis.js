import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
    try {
      const response = await api.post("login", data);
      return response;
    } catch (error) {
      throw error;
    }
  });