import { applyMiddleware, compose, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default store;
