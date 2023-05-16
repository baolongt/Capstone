import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
