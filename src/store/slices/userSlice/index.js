import {
    createSlice,
} from "@reduxjs/toolkit";
import { getAllUsersApi } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    data: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllUsersApi.pending, (state, action) => {
            state.status = "loading";
        });

        builder.addCase(getAllUsersApi.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.users;
        });

        builder.addCase(getAllUsersApi.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    },

});

export default userSlice.reducer;
