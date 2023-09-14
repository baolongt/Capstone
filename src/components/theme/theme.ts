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
          padding: '16px 4px'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: indigo[300],
          borderBottom: '1px solid #ccc',
          '& .MuiTableCell-root': {
            '&::selection': {
              backgroundColor: indigo[300],
              color: '#fff'
            }
          }
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
            cursor: 'pointer',
            '&.MuiTableCell-root': {
              color: indigo[400]
            }
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
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&::selection': {
            backgroundColor: indigo[300],
            color: '#fff'
          }
        }
      }
    }
  }
});

export default theme;
