import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  storeProdutcs: any[];
}

const initialState: IInitialState = {
  storeProdutcs: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setStoreProducts: (state, actions: PayloadAction<any>) => {
      state.storeProdutcs = actions.payload;
    },
  },
});

export const { setStoreProducts } = productSlice.actions;
export default productSlice.reducer;
