/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaintings } from '../../utils/api';

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async (_, { getState }) => {
    const state = getState();
    const { filters } = state.paintings;

    try {
      const response = await getPaintings('filtered', filters);
      if (!response.ok) {
        throw new Error('Server Error');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const fetchPages = createAsyncThunk(
  'paintings/fetchPages',
  async (_, { getState }) => {
    const state = getState();
    const { filters } = state.paintings;

    const response = await getPaintings(_, filters);

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    return data;
  },
);

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    items: [],
    filters: {
      perView: 9,
      name: '',
      currentPage: 1,
      authorId: '',
      locationId: '',
      year: {
        from: '',
        to: '',
      },
    },
    pagination: {
      pages: '',
      numberOfItems: null,
      isLoading: null,
      isError: null,
    },
    isLoading: null,
    isError: null,
  },
  reducers: {
    setPages: (state, action) => {
      state.pagination.pages = action.payload;
    },
    setNumberOfItems: (state, action) => {
      state.pagination.numberOfItems = action.payload;
    },
    setAuthorId: (state, action) => {
      state.filters.authorId = action.payload;
    },
    setLocationId: (state, action) => {
      state.filters.locationId = action.payload;
    },
    setName: (state, action) => {
      state.filters.name = action.payload;
    },
    setPerView: (state, action) => {
      state.filters.perView = action.payload;
    },
    setYearFrom: (state, action) => {
      state.filters.year.from = action.payload;
    },
    setYearTo: (state, action) => {
      state.filters.year.to = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.filters.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchPaintings.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [fetchPaintings.fulfilled]: (state, action) => {
      state.items = [];
      state.items.push(...action.payload);
      state.isLoading = false;
      state.isError = false;
    },
    [fetchPaintings.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    [fetchPages.pending]: (state) => {
      state.pagination.isLoading = true;
      state.pagination.isError = false;
    },
    [fetchPages.fulfilled]: (state) => {
      state.pagination.isLoading = false;
      state.pagination.isError = false;
    },
    [fetchPages.rejected]: (state) => {
      state.pagination.isLoading = false;
      state.pagination.isError = true;
    },
  },
});

export const {
  setAuthorId,
  setLocationId,
  setName,
  setPerView,
  setYearFrom,
  setYearTo,
  setCurrentPage,
  setPages,
  setNumberOfItems,
} = paintingsSlice.actions;

export const selectPaintings = (state) => state.paintings.items;
export const selectLoading = (state) => state.paintings.isLoading;
export const selectError = (state) => state.paintings.isError;
export const selectCurrentPage = (state) => state.paintings.filters.currentPage;
export const selectFilters = (state) => state.paintings.filters;
export const selectYearFrom = (state) => state.paintings.filters.year.from;
export const selectYearTo = (state) => state.paintings.filters.year.to;
export const selectPages = (state) => state.paintings.pagination.pages;

export default paintingsSlice.reducer;
