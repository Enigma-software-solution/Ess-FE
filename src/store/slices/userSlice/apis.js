import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getAllUsersApi = createAsyncThunk("users/get-users", async () => {
    try {
        const response = await api.get("/users");
        return response;
    } catch (error) {
        throw error;
    }
});

export const deleteUserApi = createAsyncThunk(
    "user/delete-user",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/user/${userId}`);
            toast.success("User deleted Successfully")

            return { userId };
        } catch (error) {
            return rejectWithValue(error?.response?.data || "An error occurred");
        }
    }
);

export const updateUserApi = createAsyncThunk(
    "user/patch-user",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/user/${user?.id}`, user.data);
            toast.success("User Updated Successfully")

            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);
