import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const registerUser = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("register", data);
    toast.success("User created successfully! Please check your inbox for a confirmation email.");
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const resendConfiramtionEmail = createAsyncThunk("auth/resend-confirmation-email", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("resend_confirmation", data);
    toast.success("Confiramtion email sent successfully, Please check your inbox for a confirmation email.");
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("login", data);
    return response;
  } catch (error) {
    toast.warn(error?.message)
    return rejectWithValue(error);

  }
});


export const refresh = createAsyncThunk("auth/refresh", async (refreshToken, { rejectWithValue }) => {
  try {
    const response = await api.post("/refresh_token", { refreshToken: refreshToken });
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const updateUser = createAsyncThunk("auth/update-user", async (data, { rejectWithValue }) => {
  try {
    const response = await api.put(`/user/${data?.userId}`, data?.user);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});