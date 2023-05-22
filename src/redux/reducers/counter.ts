import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  test: string;
}

const initialState: CounterState = {
  value: 0,
  test: 'this is test'
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getAsync: () => {},
    get: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getAsync, get, increment, decrement, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
