import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore, createSelector } from '@reduxjs/toolkit';

import { cartSlice } from '@modules/cart';
import { pizzaApi, pizzaSlice } from '@modules/pizza';

export const store = configureStore({
  reducer: {
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    [pizzaSlice.name]: pizzaSlice.reducer,
    [cartSlice.name]: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pizzaApi.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
