import React from 'react';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IncomingDocumentManagement from './pages/incoming-document-management';
import ReactDOM from 'react-dom';
import App from './App';
interface Props {}

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: 'incoming-documents',
        element: <IncomingDocumentManagement />
      }
    ]
  }
]);

// eslint-disable-next-line no-unused-vars
const Root: React.FC<Props> = (props) => {
  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
