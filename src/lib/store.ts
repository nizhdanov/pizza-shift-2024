import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore, createSelector } from '@reduxjs/toolkit';

import { userSlice } from '@modules/user';

import { api } from './modules/api';
import { cartSlice } from './modules/cart';
import { selectedItemSlice } from './modules/selectedItem';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [selectedItemSlice.name]: selectedItemSlice.reducer,
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
