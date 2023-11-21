import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dailyApplyReducer from "./slices/dailyApplySlice";
import profileReducer from "./slices/profielSlice"
import agendaReducer from "./slices/agendaSlice"
import globalReducer from "./slices/globalSlice";
import userReducer from "./slices/userSlice";
import clientReducer from "./slices/clientSlice";
import attendanceReducer from "./slices/attendanceSlice/GetAttendanceSlice";
import { attendanceStatsReducer } from "./slices/attendanceSlice/GetAttendanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    dailyApply: dailyApplyReducer,
    profile: profileReducer,
    agenda: agendaReducer,
    client: clientReducer,
    theme: globalReducer,
    attendance: attendanceReducer,
    attendanceStats: attendanceStatsReducer,

  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false, // to avoid serialization error
    }),
    // tokenMiddleware, // custom middleware to add token to request headers
  ],
});

export default store;
