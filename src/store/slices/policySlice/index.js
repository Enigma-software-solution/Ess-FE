import {
    createSlice,
} from "@reduxjs/toolkit";
import { createPolicyApi, detelePolicyApi, getPolicyApi, updatePolicyApi } from "./apis";

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

        builder.addCase(createPolicyApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data.policy = [action?.payload?.data, ...state?.data?.policy];
        });


        builder.addCase(detelePolicyApi.fulfilled, (state, action) => {
            state.data = state?.data?.filter((policy) => policy?._id !== action?.payload?.policyId);
        });

        builder.addCase(updatePolicyApi.fulfilled, (state, action) => {
            console.log(action.payload.event, "stateeeee")
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
