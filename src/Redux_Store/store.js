// store.js
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    // Add other reducers if needed
  },
});

export default store;
