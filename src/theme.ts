import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b71c1c", // Canlı kırmızı
      light: "#f9c2c2", // pastel kırmızı
    },
    secondary: {
      main: "#f48fb1", // Pastel pembe
    },
    background: {
      default: "#fff5f7", // Hafif pastel pembe arka plan
      paper: "#ffffff", // Kartlar ve yüzeyler için temiz beyaz
    },
    text: {
      primary: "#4a4a4a", // Nötr koyu gri
      secondary: "#7a7a7a", // Orta tonlu gri
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e63946", // Canlı kırmızı
    },
    secondary: {
      main: "#f48fb1", // Yumuşak pastel pembe
    },
    background: {
      default: "#2a1e24", // Koyu pembe-alt tonlu bir arka plan
      paper: "#3a2b31", // Kartlar için koyu, sıcak bir ton
    },
    text: {
      primary: "#eaeaea", // Açık beyaz
      secondary: "#bdbdbd", // Yumuşak gri
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});
