import { all, fork } from "redux-saga/effects";
import CounterSaga from "./counterSaga";

export default function* rootSaga() {
	yield all([fork(CounterSaga)]);
}
