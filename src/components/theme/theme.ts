import { inputBaseClasses } from '@mui/material';
import { grey, indigo, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[400],
      contrastText: '#fff',
      light: indigo[300],
      dark: indigo[600]
    },
    secondary: {
      main: grey[400],
      light: grey['A200'],
      dark: grey[700]
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: indigo[300]
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': {
            border: 0
          },
          '&:hover td': {
            backgroundColor: indigo[50],
            cursor: 'pointer'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&#noti-button': {
            '&:hover': {
              backgroundColor: indigo[50],
              color: indigo[400]
            },
            '&[aria-expanded="true"]': {
              color: indigo[400]
            }
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&:hover': {
            borderColor: indigo[200]
          }
        }
      }
    }
  }
});

export default theme;
