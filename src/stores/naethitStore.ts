import { adminApiSlice } from './../services/naethitapi';
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
});