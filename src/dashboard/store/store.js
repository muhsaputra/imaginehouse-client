import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPassReducer from "./slices/forgotResetPasswordSlice";

// ✅ Konfigurasi Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // state.user
    forgotPassword: forgotResetPassReducer, // state.forgotPassword
  },
  devTools: process.env.NODE_ENV !== "production", // Aktifkan Redux DevTools hanya saat development
});
