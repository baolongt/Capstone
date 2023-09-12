import { grey, indigo, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      contrastText: '#fff',
      light: indigo[300],
      dark: indigo[900]
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
    MuiIcon: {
      styleOverrides: {
        root: {
          color: grey[400],
          '&:hover': {
            color: indigo[500]
          }
        }
      }
    }
  }
});

export default theme;
