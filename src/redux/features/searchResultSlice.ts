import BookVolume from "@/app/models/BookVolume";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResultState = {
    results: BookVolume[];
    totalItems: number;
}

const initialState = {
    value: {
        results: [],
        totalItems: 0,
    } as ResultState,
}

export const searchResultSlice = createSlice({
    name: "searchResult",
    initialState: initialState,
    reducers: {
        updateSearchResult: (state, action: PayloadAction<ResultState>) => {
            state.value = action.payload;
        },
        clearSearchResult: (state) => {
            state.value = initialState.value;
        }
    },
});

export const { updateSearchResult, clearSearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;