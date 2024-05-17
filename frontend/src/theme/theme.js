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
        style: {
          margin: "5px",
        }
      },
      variants: [
        {
          props: { variant: 'contrast' },
          style: {
            border: "1px solid #fff",
            color: "#fff"
          }
        }
      ]
    },
    MuiAccordion: {
      defaultProps: {
        variant: 'outlined',
        style: {
          margin: "5px",
        }
      },
    }
  }
});

