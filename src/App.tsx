import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { Layout } from "./components/layout/Layout";
import { PeriodCalendar } from "./components/calendar/calendar";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Varsayılan light theme

  const handleThemeChange = () => {
    setIsDarkMode((prevMode) => !prevMode); // Tema değişimini tersine çevir
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Layout isDarkMode={isDarkMode} handleThemeChange={handleThemeChange}>
        <PeriodCalendar />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
