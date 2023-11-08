
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";



export const submitAttendanceApi = createAsyncThunk(
    "attendance/post-attendance",
    async (attendanceData, { rejectWithValue }) => {
        try {
            const response = await api.post("/attendance", attendanceData);
            toast.success(response?.message)
            return response;
        } catch (error) {
            toast.warn(error.response.data.message || error?.message)
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);