import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  highlights: [],
  loading: false,
  error: null,
};

const highlightsSlice = createSlice({
  name: 'highlights',
  initialState,
  reducers: {
    setHighlights: (state, action) => {
      state.highlights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setHighlights, setLoading, setError } = highlightsSlice.actions;
export default highlightsSlice.reducer; 