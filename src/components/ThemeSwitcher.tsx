"use client";

import { useThemeMode } from "@/contexts/ThemeModeContext";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeSwitcher() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      aria-label="Toggle theme"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        p: "7px",
        color: "text.primary",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </IconButton>
  );
}
