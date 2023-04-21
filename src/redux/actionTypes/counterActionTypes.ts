export const GET_COUNTER = "counterTypes/GET_COUNTER";
export interface GetCounterAction {
	type: typeof GET_COUNTER;
}

export const SET_COUNTER = "counterTypes/SET_COUNTER";
export interface SetCounterAction {
	type: typeof SET_COUNTER;
	counter: number;
}

export const GET_COUNTER_REQUEST = "counterTypes/GET_COUNTER_REQUEST";
export interface GetCounterRequestAction {
	type: typeof GET_COUNTER_REQUEST;
}

export const GET_COUNTER_SUCCESS = "counterTypes/GET_COUNTER_SUCCESS";
export interface GetCounterSuccessAction {
	type: typeof GET_COUNTER_SUCCESS;
	counter: number;
}

export const GET_COUNTER_FAIL = "counterTypes/GET_COUNTER_FAIL";
export interface GetCounterFailureAction {
	type: typeof GET_COUNTER_FAIL;
	error: Error | string;
}

export type CounterAction =
	| GetCounterAction
	| SetCounterAction
	| GetCounterRequestAction
	| GetCounterSuccessAction
	| GetCounterFailureAction;
