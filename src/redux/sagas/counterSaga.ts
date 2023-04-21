import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import * as actionCreators from "../actionCreators/counterActionCreator";
import * as actionTypes from "../actionTypes/counterActionTypes";
import { fetchCounter } from "../services/counter";

function* onLoadCounter() {
	try {
		const counter: number = yield call(fetchCounter);
		yield put(actionCreators.getCounterSuccess(counter));
	} catch (error) {
		yield put(actionCreators.getCounterFailure(error as Error));
	}
}

function* watchOnLoadCounter() {
	yield takeEvery(actionTypes.GET_COUNTER, onLoadCounter);
}

export default function* counterSaga() {
	yield all([fork(watchOnLoadCounter)]);
}
