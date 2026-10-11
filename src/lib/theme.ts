import { ThemeOptions } from "@mui/material/styles";

export const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          background: {
            default: "#172322",
            paper: "#213330",
          },
          primary: {
            main: "#79c5b7",
            light: "#a1d8c9",
            dark: "#4d9a91",
            contrastText: "#172322",
          },
          secondary: {
            main: "#e49a68",
            light: "#f0b58e",
            dark: "#c26a32",
            contrastText: "#172322",
          },
          text: {
            primary: "#edf3ec",
            secondary: "#b3c3bd",
            disabled: "#71837d",
          },
          divider: "rgba(212,224,214,0.14)",
        }
      : {
          background: {
            default: "#f7f7f3",
            paper: "#ffffff",
          },
          primary: {
            main: "#155e63",
            light: "#237a78",
            dark: "#0f464a",
            contrastText: "#fff",
          },
          secondary: {
            main: "#c26a32",
            light: "#d9824e",
            dark: "#9d4e22",
            contrastText: "#fff",
          },
          text: {
            primary: "#172322",
            secondary: "#50615e",
            disabled: "#83908d",
          },
          divider: "rgba(21,94,99,0.16)",
        }),
  },
  typography: {
    fontFamily: "var(--font-poppins), system-ui, -apple-system, sans-serif",
    h1: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h3: { fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontFamily: "var(--font-heading)", fontWeight: 700 },
    h5: { fontFamily: "var(--font-heading)", fontWeight: 600 },
    h6: { fontFamily: "var(--font-heading)", fontWeight: 600 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.65 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth", scrollPaddingTop: "80px" },
        body: {
          backgroundColor: mode === "dark" ? "#172322" : "#f7f7f3",
          color: mode === "dark" ? "#edf3ec" : "#172322",
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::-webkit-scrollbar": { width: "5px" },
        "::-webkit-scrollbar-track": { background: mode === "dark" ? "#172322" : "#f7f7f3" },
        "::-webkit-scrollbar-thumb": {
          background: mode === "dark" ? "#79c5b7" : "#155e63",
          borderRadius: "3px",
        },
        "::-webkit-scrollbar-thumb:hover": { background: mode === "dark" ? "#a1d8c9" : "#237a78" },
        "::selection": {
          background: "rgba(21,94,99,0.25)",
          color: mode === "dark" ? "#edf3ec" : "#172322",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1.4,
        },
        contained: {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(121,197,183,0.24)"
                : "0 8px 24px rgba(21,94,99,0.18)",
          },
          transition: "background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
        },
        outlined: {
          borderColor: mode === "dark" ? "rgba(121,197,183,0.4)" : "rgba(21,94,99,0.3)",
          "&:hover": {
            borderColor: mode === "dark" ? "#a1d8c9" : "#155e63",
            backgroundColor: mode === "dark" ? "rgba(121,197,183,0.08)" : "rgba(21,94,99,0.08)",
            transform: "translateY(-2px)",
          },
          transition: "background-color 0.25s ease, transform 0.2s ease, border-color 0.25s ease",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#213330" : "#ffffff",
          border: `1px solid ${mode === "dark" ? "rgba(212,224,214,0.14)" : "rgba(0,0,0,0.08)"}`,
          borderRadius: 16,
          backgroundImage: "none",
          transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: mode === "dark" ? "rgba(121,197,183,0.4)" : "rgba(21,94,99,0.3)",
            boxShadow:
              mode === "dark"
                ? "0 14px 36px rgba(0,0,0,0.22)"
                : "0 8px 30px rgba(23,35,34,0.08)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: mode === "dark" ? "rgba(23,35,34,0.65)" : "rgba(247,247,243,0.7)",
            borderRadius: 10,
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
            fontSize: "0.875rem",
            color: mode === "dark" ? "#edf3ec" : "#172322",
            "& fieldset": { borderColor: mode === "dark" ? "rgba(212,224,214,0.14)" : "rgba(0,0,0,0.15)" },
            "&:hover fieldset": {
              borderColor: mode === "dark" ? "rgba(121,197,183,0.4)" : "rgba(21,94,99,0.4)",
            },
            "&.Mui-focused fieldset": { borderColor: mode === "dark" ? "#79c5b7" : "#155e63" },
            "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & textarea:-webkit-autofill, & textarea:-webkit-autofill:hover, & textarea:-webkit-autofill:focus": {
              WebkitTextFillColor: mode === "dark" ? "#edf3ec" : "#172322",
              caretColor: mode === "dark" ? "#edf3ec" : "#172322",
              WebkitBoxShadow: `0 0 0 100px ${mode === "dark" ? "rgba(23,35,34,0.65)" : "rgba(247,247,243,0.7)"} inset`,
              boxShadow: `0 0 0 100px ${mode === "dark" ? "rgba(23,35,34,0.65)" : "rgba(247,247,243,0.7)"} inset`,
              borderRadius: "inherit",
              transition: "background-color 9999s ease-out 0s",
            },
          },
          "& .MuiInputLabel-root": {
            color: mode === "dark" ? "#b3c3bd" : "#50615e",
            fontSize: "0.875rem",
            "&.Mui-focused": { color: mode === "dark" ? "#79c5b7" : "#155e63" },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          fontWeight: 500,
          fontSize: "0.8rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === "dark" ? "rgba(23,35,34,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(18px)",
        },
      },
    },
  },
});
