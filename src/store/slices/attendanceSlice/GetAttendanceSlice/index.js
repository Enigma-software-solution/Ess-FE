import { createSlice } from "@reduxjs/toolkit";
import { getUserAttendanceById, getUserAttendanceStatsById } from "./api";

const initialState = {
    status: "idle",
    error: null,
    data: [],
    loading: false,
};

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    extraReducers(builder) {
        builder.addCase(getUserAttendanceById.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getUserAttendanceById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.data = action.payload.data;
        });

        builder.addCase(getUserAttendanceById.rejected, (state, action) => {
            state.status = "error";
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const initialStateStats = {
    status: "idle",
    error: null,
    statsData: {},
    loading: false,
};

const attendanceStatsSlice = createSlice({
    name: "attendanceStats",
    initialState: initialStateStats,
    extraReducers(builder) {
        builder.addCase(getUserAttendanceStatsById.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getUserAttendanceStatsById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.statsData = action.payload;
        });

        builder.addCase(getUserAttendanceStatsById.rejected, (state, action) => {
            state.status = "error";
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { reducer: attendanceStatsReducer } = attendanceStatsSlice;

export default attendanceSlice.reducer;
