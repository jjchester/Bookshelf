import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QueryState = {
    titleQuery: string;
    authorQuery: string;
    isbnQuery: string;
}

const initialState = {
    value: {
        titleQuery: "",
        authorQuery: "",
        isbnQuery: "",
    } as QueryState,
}

export const searchQuerySlice = createSlice({
    name: "searchQuery",
    initialState: initialState,
    reducers: {
        update: (state, action: PayloadAction<QueryState>) => {
            state.value = action.payload;
        }
    },
});

export const { update } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;