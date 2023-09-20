import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "src/helpers/api";

export const getAllEventsApi = createAsyncThunk("agenda/get-all-events", async () => {
  try {
    const response = await api.get("/event");
    return response;
  } catch (error) {
    throw error;
  }
});

export const createEventsApi = createAsyncThunk("agenda/create-new-event", async (data) => {
  try {
    const response = await api.post("/event", data);
    toast.success(response?.message)
    return response;
  } catch (error) {
    toast.warn(error?.message)
    throw error;
  }
});

export const UpdateEventsApi = createAsyncThunk("agenda/update-event", async (data) => {
  try {
    const response = await api.patch(`/event/${data?.eventId}`, data.event);
    toast.success(response?.message)
    return response;
  } catch (error) {
    toast.warn(error?.message)
    throw error;
  }
});

export const DeleteEventsApi = createAsyncThunk(
  "agenda/delete-event",
  async (eventId) => {
    try {
      const response = await api.delete(`/event/${eventId}`);
      toast.success(response?.message)
      return { eventId };
    } catch (error) {
      toast.warn(error?.message)
      throw error;
    }
  });

export const updateEventNotes = createAsyncThunk("agenda/update-event-notes", async (data) => {
  try {
    const response = await api.put(`/event/notes/${data?.eventId}`, { notes: data?.notes });
    console.log(response,'rrr')
    toast.success(response?.message)
    return response;
  } catch (error) {
    toast.warn(error?.message)
    throw error;
  }
});



export const getApplyBySearchApi = createAsyncThunk("agenda/get-apply-by-search", async (query) => {
  try {
    const response = await api.get(`/apply?${query}`);
    return response;
  } catch (error) {
    throw error;
  }
});

