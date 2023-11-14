
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";


export const getAllStatsApi = createAsyncThunk("attendance/get-attendance", async () => {
    try {
        const response = await api.get("/attendance/stats/all");
        return response;
    } catch (error) {
        throw error;
    }
});

export const getAllUsersStatsApi = createAsyncThunk("attendance/get-all-users-attendance-stats", async () => {
    try {
        const response = await api.get("/attendance/users/stats");
        return response;
    } catch (error) {
        throw error;
    }
});