import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

interface Props {}

// eslint-disable-next-line no-unused-vars
const Root: React.FC<Props> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
