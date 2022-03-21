/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.isDark;

export default themeSlice.reducer;
