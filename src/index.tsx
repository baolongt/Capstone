import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';

interface Props {}

const store = configureStore();

const Root: React.FC<Props> = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
