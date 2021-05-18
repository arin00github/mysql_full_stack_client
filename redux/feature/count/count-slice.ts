import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IcountProps {
  countNumber: number;
}

export const countInitialState: IcountProps = {
  countNumber: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState: countInitialState,
  reducers: {
    addCount: (state, action: PayloadAction<number>) => ({
      ...state,
      countNumber: state.countNumber + 1,
    }),
    disCount: (state, action: PayloadAction<number>) => ({
      ...state,
      countNumber: state.countNumber - 1,
    }),
  },
});

export const countAction = countSlice.actions;

export default countSlice.reducer;
