import {
  createSlice,
} from "@reduxjs/toolkit";
import { createProfileApi, deteleProfileApi, getProfilesApi, updateProfileApi } from "./apis";

const initialState = {
  status: "idle",
  error: null,
  selectedProfile: undefined,
  data: [],
  isLoading: false,
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
      state.isLoading = true;
    });

    builder.addCase(getProfilesApi.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isLoading = false;
      state.data = action.payload.data;
    });

    builder.addCase(getProfilesApi.rejected, (state, action) => {
      state.status = "error";
      state.isLoading = 'error';
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

    builder.addCase(deteleProfileApi.fulfilled, (state, action) => {
      state.data = state?.data?.filter((profile) => profile?._id !== action?.payload?.profileId)
    });
  },

});
export const { setSelectedProfile } = profileSlice.actions;

export default profileSlice.reducer;
