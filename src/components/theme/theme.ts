import { red } from '@mui/material/colors';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#272829',
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
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#030303'
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#030303'
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ccc'
            },
            '& .MuiOutlinedInput-input': {
              color: '#999',
              backgroundColor: '#f5f5f5'
            },
            '& .MuiInputBase-inputMultiline.Mui-disabled': {
              color: '#999',
              backgroundColor: '#f5f5f5',
              padding: '0px',
              borderRadius: '4px'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ccc'
            }
          }
        }
      }
    }
  }
});

export default theme;
