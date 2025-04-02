import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  tenantConfigs: any | null;
}

const initialState: IInitialState = {
  tenantConfigs: null,
};

const configSlice = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    setTenantConfig: (state, actions: PayloadAction<any>) => {
      state.tenantConfigs = actions.payload;
    },
  },
});

export const { setTenantConfig } = configSlice.actions;
export default configSlice.reducer;
