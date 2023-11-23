import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  try {
    const response = await api.post("register", data);
    toast.success("User created successfully! Please check your inbox for a confirmation email.")
    return response;
  } catch (error) {
    throw error;
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await api.post("login", data);
    return response;
  } catch (error) {
    toast.warn(error?.error?.message)
    throw error;
  }
});


export const refresh = createAsyncThunk("auth/refresh", async (refreshToken) => {
  try {
    const response = await api.post("/refresh_token", { refreshToken: refreshToken });
    return response;
  } catch (error) {
    throw error;
  }
});


export const updateUser = createAsyncThunk("auth/update-user", async (data) => {
  try {
    const response = await api.put(`/user/${data?.userId}`, data?.user);
    return response;
  } catch (error) {
    throw error;
  }
});