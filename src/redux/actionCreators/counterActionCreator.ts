import * as actions from "../actionTypes/counterActionTypes";

export function getCounter(): actions.GetCounterAction {
	return {
		type: actions.GET_COUNTER
	};
}

export function getCounterRequest(): actions.GetCounterRequestAction {
	return {
		type: actions.GET_COUNTER_REQUEST
	};
}

export function getCounterSuccess(
	counter: number
): actions.GetCounterSuccessAction {
	return {
		type: actions.GET_COUNTER_SUCCESS,
		counter
	};
}

export function getCounterFailure(
	error: Error | string
): actions.GetCounterFailureAction {
	return {
		type: actions.GET_COUNTER_FAIL,
		error
	};
}

export function setCounter(counter: number): actions.SetCounterAction {
	return {
		type: actions.SET_COUNTER,
		counter
	};
}
