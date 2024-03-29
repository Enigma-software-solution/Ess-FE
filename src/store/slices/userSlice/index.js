import {
    createSlice,
} from "@reduxjs/toolkit";
import { deleteUserApi, getAllUsersApi, updateUserApi } from "./apis";
import { registerUser } from "../authSlice/apis";

const initialState = {
    status: "idle",
    error: null,
    selectedUser: undefined,
    data: [],
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },

    },

    extraReducers(builder) {
        builder.addCase(getAllUsersApi.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getAllUsersApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.data = action.payload.data;
        });

        builder.addCase(getAllUsersApi.rejected, (state, action) => {
            state.status = "error";
            state.loading = "error";
            state.error = action.error.message;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data.Users = [action?.payload?.user, ...state?.data?.Users];
        });

        builder.addCase(updateUserApi.fulfilled, (state, action) => {
            state.data.Users = state?.data?.Users?.map(user => {
                if (user?._id === action?.payload?.data?._id) {
                    return action?.payload?.data
                }
                return user
            })
        });

        builder.addCase(deleteUserApi.fulfilled, (state, action) => {
            state.data.Users = state?.data?.Users?.filter((user) => user?._id !== action?.payload?.userId)
        });
    },

});

export const { setSelectedUser } = userSlice?.actions;


export default userSlice.reducer;
