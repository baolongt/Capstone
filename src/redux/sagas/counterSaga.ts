import { put, call, takeLatest } from 'redux-saga/effects';
import { get, getAsync } from '../reducers/counter';
import { setError } from '../reducers/error';
import { startLoading, stopLoading } from '../reducers/loading';
import { fetchCounter } from '../services/counter';

export function* handleGetCounter() {
  try {
    yield put(startLoading());
    const response: number = yield call(fetchCounter);
    yield put(get(response));
    yield put(stopLoading());
  } catch (error) {
    console.log('Error fetching counter:', error);
    yield put(setError(error));
  }
}

export default function* watchGetCounter() {
  yield takeLatest(getAsync.type, handleGetCounter);
}
