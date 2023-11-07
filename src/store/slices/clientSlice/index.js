import {
    createSlice,
} from "@reduxjs/toolkit";
import { createClientApi, deleteClientApi, getAllClientsApi } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    data: [],
    loading: false,
};

const clientSlice = createSlice({
    name: "client",
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllClientsApi.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getAllClientsApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false
            state.data = action.payload.data;
        });

        builder.addCase(getAllClientsApi.rejected, (state, action) => {
            state.status = "error";
            state.loading = "error"
            state.error = action.error.message;
        });

        builder.addCase(createClientApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = [action?.payload?.data, ...state.data];
        });

        builder.addCase(deleteClientApi.fulfilled, (state, action) => {
            state.data = state?.data?.filter((client) => client?._id !== action?.payload?.clientId)
        });
    },

});

export default clientSlice.reducer;
