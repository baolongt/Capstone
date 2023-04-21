import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { getCounter } from "../../redux/actionCreators/counterActionCreator";
import * as actionTypes from "../../redux/actionTypes/counterActionTypes";
import { AppState } from "../../redux/reducers/rootReducer";
import CounterComponent from "./CounterComponent";

const mapStateToProps = (state: AppState) => {
	return {
		counter: state.counter.counter,
		isLoading: state.isLoading[actionTypes.GET_COUNTER],
		error: state.error[actionTypes.GET_COUNTER]
	};
};

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.CounterAction>) => ({
	onLoad: () => {
		dispatch(getCounter());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
