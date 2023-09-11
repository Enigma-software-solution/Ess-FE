import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getAllEventsApi = createAsyncThunk("agenda/get-all-events", async () => {
    try {
      const response = await api.get("/event");
      return response;
    } catch (error) {
      throw error;
    }
  });

