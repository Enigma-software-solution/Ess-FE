import {
    createSlice,
} from "@reduxjs/toolkit";
import { getAllClientsApi } from "./apis";

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
    },

});

export default clientSlice.reducer;
