import { green, grey, indigo, red } from '@mui/material/colors';
import { viVN } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
//MuiTableFooter-root

const theme = createTheme(
  {
    palette: {
      primary: {
        main: indigo[400],
        contrastText: '#fff',
        light: indigo[300],
        dark: indigo[600]
      },
      secondary: {
        main: grey[400],
        light: grey['A100'],
        dark: grey[700]
      },
      error: {
        main: red.A400
      },
      success: {
        main: green[300]
      }
    },
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 14,
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::selection': {
            backgroundColor: indigo[300],
            color: '#fff'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: indigo[300],
            borderBottom: '1px solid #ccc'
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            '&:last-child td, &:last-child th': {
              border: 0
            },
            tr: {
              '&.MuiTableRow-root': {
                '&:hover': {
                  backgroundColor: indigo[50],
                  cursor: 'pointer',
                  color: indigo[400]
                }
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
            },
            '&##account-button': {
              '&:hover': {
                '.MuiSvgIcon-root': {
                  color: indigo[400]
                }
              }
            }
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '.Mui-focused': {
              '.MuiSvgIcon-root': {
                color: indigo[400]
              }
            },
            '.MuiInputAdornment-root': {
              '.MuiSvgIcon-root': {
                color: grey[900]
              }
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: indigo[300]
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: indigo[300]
            },
            '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: indigo[300]
            },
            '& .Mui-disabled': {
              backgroundColor: grey[100],
              color: grey[500]
            }
          }
        }
      }
    }
  },
  viVN
);

export default theme;
