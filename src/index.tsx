import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import theme from './components/theme/theme';

const queryClient = new QueryClient();

interface Props {}

// eslint-disable-next-line no-unused-vars
const Root: React.FC<Props> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
