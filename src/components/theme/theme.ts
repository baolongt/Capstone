import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#2979ff'
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 14
  }
});

export default theme;
