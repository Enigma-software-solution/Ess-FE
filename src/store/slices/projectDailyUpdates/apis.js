import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

// export const getDailyProjectUpdateApi = createAsyncThunk("user-daily-updates/get-user-daily-updates", async () => {
//     try {
//       const response = await api.get("/user-daily-updates");
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   });
  
  
  export const createDailyProjectUpdateApi = createAsyncThunk(
    "user-daily-updates/post-user-daily-updates",
    async (userDailyUpdateData, { rejectWithValue }) => {
      try {
        const response = await api.post("/user-daily-updates", userDailyUpdateData);
        toast.success(response?.message)
        return response;
      } catch (error) {
        toast.warn(error.response.data.message || error?.message)
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );