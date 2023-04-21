import * as actions from "../actionTypes/counterActionTypes";

export interface CounterState {
	counter: number;
}

const initialState: CounterState = {
	counter: 0
};

export default function counterReducer(
	state: CounterState = initialState,
	action: actions.CounterAction
): CounterState {
	switch (action.type) {
		case actions.GET_COUNTER_SUCCESS:
			return {
				counter: action.counter
			};
		default:
			return state;
	}
}
