export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "themeMode";

export const isThemeMode = (value: string | undefined | null): value is ThemeMode =>
  value === "light" || value === "dark";

export const getThemeMode = (value: string | undefined | null): ThemeMode | null =>
  isThemeMode(value) ? value : null;

export const themeInitScript = `
(() => {
  const storageKey = "${THEME_STORAGE_KEY}";
  const root = document.documentElement;
  const applyTheme = (mode) => {
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    root.dataset.theme = mode;
    root.style.colorScheme = mode;
  };

  try {
    const savedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : systemTheme;

    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
  } catch {
    applyTheme("light");
  }
})();
`;
