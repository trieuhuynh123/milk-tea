import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  listCategory: any[];
}

const initialState: IInitialState = {
  listCategory: [],
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setListCategory: (state, actions: PayloadAction<any>) => {
      state.listCategory = actions.payload;
    },
  },
});

export const { setListCategory } = categorySlice.actions;
export default categorySlice.reducer;
