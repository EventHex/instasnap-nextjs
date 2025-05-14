import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedImages: [],
  selectedFiles: [],
  previews: [],
  isUploading: false,
  uploadStatus: { message: '', type: '' },
  isLoadingUploads: true,
  isDragging: false,
};

const contributeSlice = createSlice({
  name: 'contribute',
  initialState,
  reducers: {
    setUploadedImages: (state, action) => {
      state.uploadedImages = action.payload;
      state.isLoadingUploads = false;
    },
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    setPreviews: (state, action) => {
      state.previews = action.payload;
    },
    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    setIsLoadingUploads: (state, action) => {
      state.isLoadingUploads = action.payload;
    },
    setIsDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    addNewUpload: (state, action) => {
      state.uploadedImages = [action.payload, ...state.uploadedImages];
    },
    clearUploadState: (state) => {
      state.selectedFiles = [];
      state.previews = [];
      state.isUploading = false;
      state.uploadStatus = { message: '', type: '' };
    },
  },
});

export const {
  setUploadedImages,
  setSelectedFiles,
  setPreviews,
  setIsUploading,
  setUploadStatus,
  setIsLoadingUploads,
  setIsDragging,
  addNewUpload,
  clearUploadState,
} = contributeSlice.actions;

export default contributeSlice.reducer; 