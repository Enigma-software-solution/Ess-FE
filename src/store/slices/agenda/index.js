import { createSlice } from '@reduxjs/toolkit';
import { getAllEventsApi } from './apis';


const initialState = {
    selectedEvent: {},
    events:[],
    status:'idle',
    error:''
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
            state.status ='loading';
          });
      
          builder.addCase(getAllEventsApi.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.events=action.payload.data
          });
      
          builder.addCase(getAllEventsApi.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
          });
    

    },
});

export const { setSelectedEvent } = agendaSlice.actions;

export default agendaSlice.reducer;
