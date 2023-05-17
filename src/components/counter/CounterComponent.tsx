import { Button } from '@mui/material';
import React, { FunctionComponent } from 'react';

export interface Props {
  counter: number;
  isLoading: boolean;
  error: Error | string | null;
  onLoad(): void;
}

const CounterComponent: FunctionComponent<Props> = (props) => {
  const { counter, isLoading, error, onLoad } = props;

  if (error) {
    console.log('error: ', error);
    return <div>{error.toString()}</div>;
  }

  if (isLoading) {
    return <div>{'Loading..'}</div>;
  }

  return (
    <div>
      <h1>{counter}</h1>
      <Button onClick={onLoad} variant="outlined">
        Load
      </Button>
    </div>
  );
};

export default CounterComponent;
