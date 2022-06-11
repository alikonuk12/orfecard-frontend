import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './reducers/viewReducer';

export const store = configureStore({
  reducer: {
    view: viewReducer
  }
});