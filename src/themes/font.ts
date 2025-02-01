// theme.ts
import { createTheme } from '@mui/material/styles';

const Fonttheme = createTheme({
  typography: {
    fontFamily: '"Bricolage Grotesque", Arial, sans-serif',
    h1: {
      fontFamily: '"Bricolage Grotesque", Arial, sans-serif',
      fontWeight: 400,
      fontSize: '24px',
    },
    h2: {
      fontFamily: '"Bricolage Grotesque", Arial, sans-serif',
      fontWeight: 400,
      fontSize: '22px',
    },
    // Add other typography variants as needed
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Bricolage Grotesque',
          src: `url('/fonts/BricolageGrotesque_24pt_Condensed-Regular.ttf') format('truetype')`,
        },
      },
    },
  },
});

export default Fonttheme;
