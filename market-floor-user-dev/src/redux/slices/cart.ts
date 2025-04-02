import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  currentCart: any;
}

const initialState: IInitialState = {
  currentCart: null,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCurrentCart: (state, actions: PayloadAction<any>) => {
      state.currentCart = actions.payload;
    },
  },
});

export const { setCurrentCart } = cartSlice.actions;
export default cartSlice.reducer;
