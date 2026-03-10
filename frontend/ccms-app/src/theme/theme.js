import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2563EB' }, // Modern Blue
    background: {
      default: '#F1F5F9', // Ice Blue
      paper: '#FFFFFF',   // White Cards
      btns :"#295fa6",
      adminbg : "#9227a7",
      adminbg2 : "#a931be"
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  shape: { borderRadius: 16 }, // Soft rounded corners
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 800 },
    h5:{fontWeight:600},
    h6:{fontWeight:400, fontSize:"14px"}
  },
});

export default theme;
