import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/helpers/api";

export const getAllUsersApi = createAsyncThunk("users/get-users", async () => {
    try {
        const response = await api.get("/users");
        return response;
    } catch (error) {
        throw error;
    }
});
