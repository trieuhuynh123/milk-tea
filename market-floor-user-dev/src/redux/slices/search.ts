import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  searchResults: any[];
  isLoading: boolean;
}

const initialState: IInitialState = {
  searchResults: [],
  isLoading: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchResults: (state, actions: PayloadAction<any>) => {
      state.searchResults = actions.payload;
    },
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.isLoading = actions.payload;
    },
  },
});

export const { setSearchResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
