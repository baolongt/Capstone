import React, { FunctionComponent } from "react";

export interface Props {
	counter: number;
	isLoading: boolean;
	error: Error | string | null;
	onLoad(): void;
}

const CounterComponent: FunctionComponent<Props> = (props) => {
	const { counter, isLoading, error, onLoad } = props;

	if (error) {
		console.log("error: ", error);
		return <div>{error.toString()}</div>;
	}

	if (isLoading) {
		return <div>{"Loading.."}</div>;
	}

	return (
		<div>
			{counter}
			<button onClick={onLoad}>Load</button>
		</div>
	);
};

export default CounterComponent;
