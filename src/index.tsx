import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
interface Props {}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
]);

// eslint-disable-next-line no-unused-vars
const Root: React.FC<Props> = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
