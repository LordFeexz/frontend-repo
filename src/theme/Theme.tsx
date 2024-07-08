"use client";

import type { ChildrenProps } from "@/interfaces";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: [14, 16, 18],
          padding: [8, 12, 16],
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }: ChildrenProps) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
