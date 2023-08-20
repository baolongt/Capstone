import './index.css';

import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import theme from './components/theme/theme';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

const Root: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <AuthProvider>
            <App />
            <ToastContainer
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              rtl={false}
              style={{
                marginTop: '56px',
                marginBottom: '24px',
                marginLeft: '56px'
              }}
            />
          </AuthProvider>
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
