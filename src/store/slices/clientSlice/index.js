import {
    createSlice,
} from "@reduxjs/toolkit";
import { createClientApi, deleteClientApi, getAllClientsApi } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    data: []
};

const clientSlice = createSlice({
    name: "client",
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllClientsApi.pending, (state, action) => {
            state.status = "loading";
        });

        builder.addCase(getAllClientsApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
        });

        builder.addCase(getAllClientsApi.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });

        builder.addCase(createClientApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(action.payload.data, "actions")
            state.data = [action?.payload?.data, ...state.data];
        });

        builder.addCase(deleteClientApi.fulfilled, (state, action) => {
            state.data = state.data?.filter((client) => client?._id !== action?.payload?.data)
        });
    },

});

export default clientSlice.reducer;
