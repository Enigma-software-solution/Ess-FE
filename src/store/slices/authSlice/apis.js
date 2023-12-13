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

export const forgotPasswordApi = createAsyncThunk("auth/forgot-password", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/forgot_password", data);
    toast.success(response.message);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const ResetPasswordApi = createAsyncThunk("auth/reset-password", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(`/reset_password/${data.token}`, data);
    toast.success(response.message);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("login", data);
    toast.success(response.message);
    return response;
  } catch (error) {
    toast.error(error.message)
    return rejectWithValue(error);

  }
});


export const refresh = createAsyncThunk("auth/refresh", async (refreshToken, { rejectWithValue }) => {
  try {
    const response = await api.post("/refresh_token", { refreshToken: refreshToken });
    return response;
  } catch (error) {
    toast.error(error.message)
    return rejectWithValue(error);
  }
});


export const updateUser = createAsyncThunk("auth/update-user", async (formData, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/user/${formData.get('userId')}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.message);
    return response;
  } catch (error) {
    toast.error(error.message)
    return rejectWithValue(error);
  }
});