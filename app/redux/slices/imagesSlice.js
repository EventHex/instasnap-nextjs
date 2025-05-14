import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  isLoading: false,
  error: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearImages: (state) => {
      state.images = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setImages, setLoading, setError, clearImages } = imagesSlice.actions;
export default imagesSlice.reducer; 