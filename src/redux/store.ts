import { configureStore } from '@reduxjs/toolkit';
import searchQueryReducer from './features/searchQuerySlice';
import searchResultReducer from './features/searchResultSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        searchQueryReducer,
        searchResultReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;