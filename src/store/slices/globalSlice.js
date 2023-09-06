import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    themMode: "light",
  },
  reducers: {
    toggleTheme(state) {
      state.themMode = state.themMode === "light" ? "dark" : 'light';
    },
  },
});

export const { toggleTheme } = globalSlice.actions;
export default globalSlice.reducer;
