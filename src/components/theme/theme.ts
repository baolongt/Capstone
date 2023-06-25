import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#f50057'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 14
  }
  // ...and other custom settings for your theme
});

export default theme;
