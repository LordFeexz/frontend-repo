"use client";

import type { ChildrenProps } from "@/interfaces";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export default function AppThemeProvider({ children }: ChildrenProps) {
  const theme = createTheme({});
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
