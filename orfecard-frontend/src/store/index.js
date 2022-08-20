import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './reducers/viewReducer';
import cartReducer from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    view: viewReducer,
    cart: cartReducer
  }
});