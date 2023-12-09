import {
    createSlice,
} from "@reduxjs/toolkit";
import { createPolicyApi, detelePolicyApi, getPolicyApi, updatePolicyApi } from "./apis";

const initialState = {
    data: [],
    selectedPolicy: null,
    stats: null,
    isLoading: false,
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
            state.isLoading = true;
        });

        builder.addCase(getPolicyApi.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
        });

        builder.addCase(getPolicyApi.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(createPolicyApi.fulfilled, (state, action) => {
            state.data = [...state?.data, action?.payload?.data];
        });


        builder.addCase(detelePolicyApi.fulfilled, (state, action) => {
            state.data = state?.data?.filter((policy) => policy?._id !== action?.payload?.policyId);
        });

        builder.addCase(updatePolicyApi.fulfilled, (state, action) => {
            state.data = state?.data?.map(policy => {
                if (policy?._id === action?.payload?.event?._id) {
                    return action?.payload?.event
                }
                return policy
            })
        });
    }

});

export const { setSelectedPolicy } = policySlice.actions;
export default policySlice.reducer;
