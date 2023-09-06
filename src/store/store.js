import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import dailyApplyReducer from "./slices/dailyApplySlice";
import globalReducer from "./slices/globalSlice";
import { tokenMiddleware } from "./tokenMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    auth: dailyApplyReducer,
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
