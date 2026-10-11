"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeModeProvider } from "@/contexts/ThemeModeContext";
import { ThemeMode } from "@/lib/themeMode";

export default function Providers({
  children,
  initialMode,
}: {
  children: React.ReactNode;
  initialMode: ThemeMode;
}) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeModeProvider initialMode={initialMode}>
        <CssBaseline />
        {children}
      </ThemeModeProvider>
    </AppRouterCacheProvider>
  );
}
