import { createSlice } from '@reduxjs/toolkit';
import { DeleteEventsApi, UpdateEventsApi, createEventsApi, getAllEventsApi, updateEventNotes } from './apis';


const initialState = {
  selectedEvent: null,
  isEventDrawer: false,
  isSalesDrawer: false,
  isNotesDrawer: false,
  isClientEventDrawer: false,
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
    showEventDrawer: (state, _) => {
      state.isEventDrawer = true;
    },
    closeEventDrawer: (state, _) => {
      state.isEventDrawer = false;
    },



    showNotesDrawer: (state, _) => {
      state.isNotesDrawer = true;
    },
    closeNotesDrawer: (state, _) => {
      state.isNotesDrawer = false;
    },

    showSalesDrawer: (state, _) => {
      state.isSalesDrawer = true;
    },
    closeSalesDrawer: (state, _) => {
      state.isSalesDrawer = false;
    },

    showClientEventDrawer: (state, _) => {
      state.isClientEventDrawer = true;
    },
    closeClientEventDrawer: (state, _) => {
      state.isClientEventDrawer = false;
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

    // add notes
    builder.addCase(updateEventNotes.fulfilled, (state, action) => {
      state.events = state?.events?.map(event => {
        if (event?._id === action?.payload?.event?._id) {
          return action?.payload?.event
        }
        return event
      })

      state.selectedEvent = {
        ...state.selectedEvent,
        notes: action?.payload?.event?.notes
      }
    });

  },
});

export const {
  setSelectedEvent,
  showEventDrawer,
  closeEventDrawer,
  showNotesDrawer,
  closeNotesDrawer,
  showClientEventDrawer,
  closeClientEventDrawer,
  showSalesDrawer,
  closeSalesDrawer
} = agendaSlice.actions;

export default agendaSlice.reducer;
