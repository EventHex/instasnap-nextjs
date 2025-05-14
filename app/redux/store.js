import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imagesSlice';
import highlightsReducer from './slices/highlightsSlice';
import contributeReducer from './slices/contributeSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    highlights: highlightsReducer,
    contribute: contributeReducer,
  },
}); 