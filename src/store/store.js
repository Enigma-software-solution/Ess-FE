import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dailyApplyReducer from "./slices/dailyApplySlice";
import profileReducer from "./slices/profielSlice"
import agendaReducer from "./slices/agenda"
import globalReducer from "./slices/globalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyApply: dailyApplyReducer,
    profile: profileReducer,
    agenda: agendaReducer,
    theme: globalReducer,

  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false, // to avoid serialization error
    }),
    // tokenMiddleware, // custom middleware to add token to request headers
  ],
});

export default store;
