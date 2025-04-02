import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  currentStore: any;
  listStore: any[];
}

const initialState: IInitialState = {
  currentStore: null,
  listStore: [],
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {
    setCurrentStore: (state, actions: PayloadAction<any>) => {
      state.currentStore = actions.payload;
    },
    setListStore: (state, actions: PayloadAction<any[]>) => {
      state.listStore = actions?.payload;
    },
  },
});

export const { setCurrentStore, setListStore } = storeSlice.actions;
export default storeSlice.reducer;
