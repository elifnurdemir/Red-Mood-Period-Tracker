import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  Switch,
} from "@mui/material";
import {
  Adb as AdbIcon,
} from "@mui/icons-material";

interface RedMoodAppBarProps {
  isDarkMode: boolean;
  handleThemeChange: () => void;
}

export const RedMoodAppBar: React.FC<RedMoodAppBarProps> = ({
  isDarkMode,
  handleThemeChange,
}) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenMenu =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
    (event: MouseEvent<HTMLElement>) =>
      setter(event.currentTarget);

  const handleCloseMenu =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => () =>
      setter(null);

  return (
    <AppBar position="relative" sx={{ bgcolor: "primary", mt: 0 }}>
      <Toolbar>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          component="a"
          href="#responsive-app-bar"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          RedMood
        </Typography>
        <Typography variant="subtitle1">Regl Takibi</Typography>

        <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
          <IconButton
            size="small"
            aria-label="menu"
            onClick={handleOpenMenu(setAnchorElNav)}
            color="inherit"
          >
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseMenu(setAnchorElNav)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ display: { xs: "block", md: "none" } }}
          ></Menu>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}></Box>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />

        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenMenu(setAnchorElUser)} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseMenu(setAnchorElUser)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          ></Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
