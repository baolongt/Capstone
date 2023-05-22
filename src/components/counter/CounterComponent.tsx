import { Button, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import {
  increment,
  decrement,
  incrementByAmount,
  getAsync
} from '../../redux/reducers/counter';
import { AppState } from '../../redux/reducers/rootReducer';

const CounterComponent: React.FC = () => {
  const value = useSelector((state: AppState) => state.counter.value);
  const isLoading = useSelector((state: AppState) => state.loading.isLoading);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(increment())} variant="outlined">
        +
      </Button>
      {isLoading ? <CircularProgress /> : <span>{value}</span>}

      <Button onClick={() => dispatch(decrement())} variant="outlined">
        -
      </Button>
      <Button
        onClick={() => dispatch(incrementByAmount(10))}
        variant="outlined"
      >
        +10
      </Button>
      <Button onClick={() => dispatch(getAsync())} variant="outlined">
        Load
      </Button>
    </div>
  );
};

export default CounterComponent;
