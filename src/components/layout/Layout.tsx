import React from "react";
import { Box, Container } from "@mui/material";
import { RedMoodAppBar } from "./AppBar";

interface LayoutProps {
  isDarkMode: boolean;
  handleThemeChange: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  isDarkMode,
  handleThemeChange,
  children,
}) => {
  return (
    <>
      <RedMoodAppBar
        isDarkMode={isDarkMode}
        handleThemeChange={handleThemeChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
        }}
      >
        <Container>{children}</Container>
      </Box>
    </>
  );
};
