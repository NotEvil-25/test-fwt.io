import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthors } from '../../utils/api';
import { createExtraReducer } from '../../utils/helper';

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async () => {
    try {
      const response = await getAuthors();

      if (!response.ok) {
        throw new Error('Server Error');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    isLoading: true,
    isError: false,
  },
  extraReducers: createExtraReducer(fetchAuthors),
});

export const { initAuthors } = authorsSlice.actions;

export const selectAuthorsState = (state) => state.authors;
export const selectAuthors = (state) => state.authors.items;

export default authorsSlice.reducer;
