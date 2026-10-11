"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "@/lib/theme";
import { getThemeMode, THEME_STORAGE_KEY, ThemeMode } from "@/lib/themeMode";

interface ThemeModeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

const THEME_CHANGE_EVENT = "portfolio-theme-change";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getStoredThemeMode(): ThemeMode {
  try {
    return getThemeMode(localStorage.getItem(THEME_STORAGE_KEY)) ?? "light";
  } catch {
    return "light";
  }
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({
  children,
  initialMode,
}: {
  children: React.ReactNode;
  initialMode: ThemeMode;
}) {
  const mode = useSyncExternalStore(
    subscribeToTheme,
    getStoredThemeMode,
    () => initialMode,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    root.dataset.theme = mode;
    root.style.colorScheme = mode;

  }, [mode]);

  const toggleColorMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
