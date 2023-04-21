import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import errorReducer from "./errorReducer";
import isLoadingReducer from "./isLoadingReducer";

const rootReducer = combineReducers({
	counter: counterReducer,
	isLoading: isLoadingReducer,
	error: errorReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
