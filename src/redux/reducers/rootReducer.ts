import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';
import errorReducer from './error';
import loadingReducer from './loading';

const rootReducer = combineReducers({
  counter: counterReducer,
  loading: loadingReducer,
  error: errorReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
