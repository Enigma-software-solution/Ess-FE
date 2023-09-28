import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getAllClientsApi = createAsyncThunk("clients/get-clients", async () => {
    try {
        const response = await api.get("/client");
        return response;
    } catch (error) {
        throw error;
    }
});