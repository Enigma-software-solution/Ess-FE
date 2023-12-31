import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAttendance,
  getAllAttendanceApi,
  getUserAttendanceById,
  getUserAttendanceStatsById,
  submitAttendanceApi,
  updateAttendaceApi,
} from "./api";

const initialState = {
  status: "idle",
  error: null,
  selectedAttendance: undefined,
  data: [],
  loading: false,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,

  reducers: {
    setSelectedAttendance(state, action) {
      state.selectedAttendance = action.payload;
    },
  },


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
    builder.addCase(getAllAttendanceApi.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });

    builder.addCase(deleteAttendance.fulfilled, (state, action) => {
      state.data.attendance = state?.data?.attendance?.filter(
        (att) => att?._id !== action.payload
      );
    });

    builder.addCase(updateAttendaceApi.fulfilled, (state, action) => {
      state.data.attendance = state?.data?.attendance?.map(attendance => {
        if (attendance?._id === action?.payload?.data?._id) {
          return action?.payload?.data
        }
        return attendance
      })
    });

    builder.addCase(submitAttendanceApi.fulfilled, (state, action) => {
      state.data.attendance = [...state?.data?.attendance, action?.payload?.data];
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
export const { setSelectedAttendance } = attendanceSlice.actions;


export default attendanceSlice.reducer;
