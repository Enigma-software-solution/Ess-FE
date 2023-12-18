import {
    createSlice,
} from "@reduxjs/toolkit";
import { createDailyProjectUpdateApi, deteleDailyProjectUpdatesApi, getDailyProjectUpdateApi } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    selectedproject: undefined,
    data: [],
    loading: false,
};

const projectDailyUpdatesSlice = createSlice({
    name: "projectDailyUpdates",
    initialState,

    // reducers: {
    //     setSelectedClient(state, action) {
    //         state.selectedClient = action.payload;
    //     },
    // },

    extraReducers(builder) {
        builder.addCase(getDailyProjectUpdateApi.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getDailyProjectUpdateApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false
            state.data = action.payload.data;
        });

        builder.addCase(getDailyProjectUpdateApi.rejected, (state, action) => {
            state.status = "error";
            state.loading = "error"
            state.error = action.error.message;
        });

        builder.addCase(createDailyProjectUpdateApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = [action?.payload?.data, ...state.data];
        });

        // builder.addCase(updateClientApi.fulfilled, (state, action) => {
        //     state.data = state?.data?.map(client => {
        //         if (client?._id === action?.payload?.data?._id) {
        //             return action?.payload?.data
        //         }
        //         return client
        //     })
        // });

        builder.addCase(deteleDailyProjectUpdatesApi.fulfilled, (state, action) => {
            state.data = state?.data?.filter((projectDailyUpdate) => projectDailyUpdate?._id !== action?.payload?.projectDailyUpdateId)
        });
    },

});

// export const { setSelectedClient } = clientSlice.actions;

export default projectDailyUpdatesSlice.reducer;
