import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
interface Props {}

// eslint-disable-next-line no-unused-vars
const Root: React.FC<Props> = (props) => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
