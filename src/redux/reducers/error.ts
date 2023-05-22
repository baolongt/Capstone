import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  error: string | null;
}

const initialState: ErrorState = {
  error: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
