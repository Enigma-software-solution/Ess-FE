import { createSlice } from '@reduxjs/toolkit';
import { DeleteEventsApi, UpdateEventsApi, createEventsApi, getAllEventsApi } from './apis';


const initialState = {
  selectedEvent: {},
  events: [],
  status: 'idle',
  error: ''
};

const agendaSlice = createSlice({
  name: 'agenda',
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEventsApi.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(getAllEventsApi.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.events = action.payload.data
    });

    builder.addCase(getAllEventsApi.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    // CREATE EVENTS
    builder.addCase(createEventsApi.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.events = [...state.events, action.payload.event]
    });

    // UPDATE EVENTS
    builder.addCase(UpdateEventsApi.fulfilled, (state, action) => {
      state.events = state?.events.map(event => {
        if (event?._id === action?.payload?.event?._id) {
          return action?.payload?.event
        }
        return event
      })
    });

    // DELETE EVENTS
    builder.addCase(DeleteEventsApi.fulfilled, (state, action) => {
      state.events = state?.events?.filter((event) => event?._id !== action?.payload?.eventId)
    });

  },
});

export const { setSelectedEvent } = agendaSlice.actions;

export default agendaSlice.reducer;
