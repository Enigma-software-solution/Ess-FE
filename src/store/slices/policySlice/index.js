import {
    createSlice,
} from "@reduxjs/toolkit";
import { getdailyAppliesApi, getDailyApplyStats, getPolicyApi } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    data: [],
    selectedPolicy: null,
    stats: null,
    loading: false,
};

const policySlice = createSlice({
    name: "policy",
    initialState,

    reducers: {
        setSelectedPolicy(state, action) {
            state.selectedPolicy = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(getPolicyApi.pending, (state, action) => {
            state.loading = true;
            state.status = "loading";
        });

        builder.addCase(getPolicyApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.data = action.payload.data;
        });

        builder.addCase(getPolicyApi.rejected, (state, action) => {
            state.status = "error";
            state.loading = "error";
            state.error = action.error.message;
        });

        // builder.addCase(createDailyAppliesApi.fulfilled, (state, action) => {
        //     state.status = "succeeded";
        //     state.data.daily_applies = [action?.payload?.data, ...state?.data?.daily_applies];
        // });

        // builder.addCase(deteleDailyAppliesApi.fulfilled, (state, action) => {
        //     state.data.daily_applies = state?.data.daily_applies?.filter((apply) => apply?._id !== action?.payload?.applyId)
        // });

        // builder.addCase(updateDailyAppliesApi.fulfilled, (state, action) => {
        //     state.data.daily_applies = state?.data?.daily_applies.map(apply => {
        //         if (apply?._id === action?.payload?.data?._id) {
        //             return action?.payload?.data
        //         }
        //         return apply
        //     })
        // });



    }

});

export const { setSelectedPolicy } = policySlice.actions;
export default policySlice.reducer;
