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
        },
        {
          props: { variant: 'nav' },
          style: {
            border: "2px solid transparent",
            borderLeft: "0",
            borderRight: "0",
            borderTop: "0",
            borderRadius: "unset",
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

