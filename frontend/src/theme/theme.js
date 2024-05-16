import { createTheme } from '@mui/material/styles'
import { borderColor } from '@mui/system';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#800020',
      contrastText: '#fff'
    },
    secondary: {
      main: '#243B4A',
      contrastText: '#fff'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      }
    },
    MuiAccordion: {
      defaultProps: {
        variant: 'outlined',
      },
    }
  }
});

