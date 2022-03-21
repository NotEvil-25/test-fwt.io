import { configureStore } from '@reduxjs/toolkit';
import paintingsReducer from './paintings/paintingsSlice';
import authorsReducer from './authors/authorsSlice';
import locationsReducer from './locations/locationsSlice';
import themeReducer from './theme/themeSlice';

const store = configureStore({
  reducer: {
    paintings: paintingsReducer,
    authors: authorsReducer,
    locations: locationsReducer,
    theme: themeReducer,
  },
});

export default store;
