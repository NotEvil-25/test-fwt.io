import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from '../../utils/api';
import { createExtraReducer } from '../../utils/helper';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    try {
      const response = await getLocations();

      if (!response.ok) {
        throw new Error('Server Error');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    items: [],
    isLoading: true,
    isError: false,
  },
  extraReducers: createExtraReducer(fetchLocations),
});

export const selectLocationsState = (state) => state.locations;
export const selectLocations = (state) => state.locations.items;

export default locationsSlice.reducer;
