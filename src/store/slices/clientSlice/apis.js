import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getAllClientsApi = createAsyncThunk("clients/get-clients", async () => {
    try {
        const response = await api.get("/client");
        return response;
    } catch (error) {
        throw error;
    }
});

export const createClientApi = createAsyncThunk(
    "client/post-client",
    async (clientData, { rejectWithValue }) => {
        try {
            const response = await api.post("/client", clientData);
            toast.success(response?.message)
            return response;
        } catch (error) {
            toast.warn(error.response.data.message || error?.message)
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


export const updateClientApi = createAsyncThunk(
    "client/patch-client",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.patch(`/client/${data.id}`, data.data);
        toast.success("Client Updated Successfully")
  
        return response;
      } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );
  


export const deleteClientApi = createAsyncThunk(
    "client/delete-client",
    async (clientId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/client/${clientId}`);
            toast.success("Client deleted Successfully")

            return { clientId };
        } catch (error) {
            return rejectWithValue(error?.response?.data || "An error occurred");
        }
    }
);