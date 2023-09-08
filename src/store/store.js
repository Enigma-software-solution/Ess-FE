import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dailyApplyReducer from "./slices/dailyApplySlice";
import profileReducer from "./slices/profielSlice"
import globalReducer from "./slices/globalSlice";
import { tokenMiddleware } from "./tokenMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyApply: dailyApplyReducer,
    profile:profileReducer,
    theme: globalReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false, // to avoid serialization error
    }),
    tokenMiddleware, // custom middleware to add token to request headers
  ],
});

export default store;
