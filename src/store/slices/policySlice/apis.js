import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getPolicyApi = createAsyncThunk("policy/get-policy", async () => {
    try {
        const response = await api.get("/policy");
        return response;
    } catch (error) {
        throw error;
    }
});