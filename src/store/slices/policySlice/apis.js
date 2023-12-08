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

export const createPolicyApi = createAsyncThunk("policy/create-policy", async (data) => {
    try {
        const response = await api.post("/policy", data);
        return response;
    } catch (error) {
        throw error;
    }
});

export const updatePolicyApi = createAsyncThunk(
    "policy/patch-policy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/policy/${data?.id}`, data?.data);
            toast.success("Policy Updated Successfully")

            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data || "An error occurred");
        }
    }
);

export const detelePolicyApi = createAsyncThunk(
    "policy/delete-policy",
    async (policyId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/policy/${policyId}`);
            toast.success("Policy deleted Successfully")

            return { policyId };
        } catch (error) {
            return rejectWithValue(error?.response?.data || "An error occurred");
        }
    }
);
