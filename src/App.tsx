import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { Layout } from "./components/layout/Layout";
import "./index.css";
import Home from "./pages/Home";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Varsayılan light theme

  const handleThemeChange = () => {
    setIsDarkMode((prevMode) => !prevMode); // Tema değişimini tersine çevir
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Layout isDarkMode={isDarkMode} handleThemeChange={handleThemeChange}>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
