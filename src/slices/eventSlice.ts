import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  availableTickets: Array<{
    id: number;
    event_id: number;
    status: string;
    type: string;
    price: number;
  }>;
}

export interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
