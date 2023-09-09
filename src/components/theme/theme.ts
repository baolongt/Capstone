import { red } from '@mui/material/colors';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff',
      light: '#F6FAFE'
    },
    secondary: {
      main: '#D8D9DA'
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 14
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '2px solid #ccc',
          padding: '16px 4px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#030303'
        },
        root: {
          backgroundColor: '#fff'
        }
      }
    }
  }
});

export default theme;
