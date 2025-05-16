"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class" // Tailwind’s “dark:” uses a “dark” class on <html>
      defaultTheme="system" // start with system preference
      enableSystem={true} // allow system toggling
      disableTransitionOnChange={true} // no CSS flicker on theme switch
    >
      {children}
    </NextThemesProvider>
  );
}
