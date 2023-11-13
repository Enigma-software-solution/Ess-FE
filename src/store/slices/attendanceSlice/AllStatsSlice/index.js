import {
    createSlice,
} from "@reduxjs/toolkit";
import { getAllStatsApi } from "./api";

const initialState = {
    status: "idle",
    error: null,
    data: [],
    loading: false,
};

const attendanceStats = createSlice({
    name: "attendanceStats",
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllStatsApi.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getAllStatsApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false
            state.data = action.payload.data;
        });

        builder.addCase(getAllStatsApi.rejected, (state, action) => {
            state.status = "error";
            state.loading = false
            state.error = action.error.message;
        });

        // builder.addCase(createClientApi.fulfilled, (state, action) => {
        //     state.status = "succeeded";
        //     state.data = [action?.payload?.data, ...state.data];
        // });

        // builder.addCase(deleteClientApi.fulfilled, (state, action) => {
        //     state.data = state?.data?.filter((client) => client?._id !== action?.payload?.clientId)
        // });
    },

});

export default attendanceStats.reducer;
