import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

interface IInitialState {
  currentOrder: any;
  orders: any[];
}

const initialState: IInitialState = {
  currentOrder: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setCurrentOrder: (state, actions: PayloadAction<any>) => {
      state.currentOrder = actions.payload;
    },
    setOrders: (state, actions: PayloadAction<any[]>) => {
      state.orders = actions.payload;
    },
  },
});

export const { setCurrentOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
