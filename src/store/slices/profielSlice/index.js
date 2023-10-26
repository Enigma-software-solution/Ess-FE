import {
  createSlice,
} from "@reduxjs/toolkit";
import { createProfileApi, getProfilesApi, updateProfileApi } from "./apis";

const initialState = {
  status: "idle",
  error: null,
  selectedProfile: undefined,
  data: []
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setSelectedProfile(state, action) {
      state.selectedProfile = action.payload;
    },

  },

  extraReducers(builder) {
    builder.addCase(getProfilesApi.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getProfilesApi.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });

    builder.addCase(getProfilesApi.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(createProfileApi.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = [action?.payload?.data, ...state?.data];
    });

    builder.addCase(updateProfileApi.fulfilled, (state, action) => {
      state.data = state?.data?.map(profile => {
        if (profile?._id === action?.payload?.data?._id) {
          return action?.payload?.data
        }
        return profile
      })
    });
  },

});
export const { setSelectedProfile } = profileSlice.actions;

export default profileSlice.reducer;
