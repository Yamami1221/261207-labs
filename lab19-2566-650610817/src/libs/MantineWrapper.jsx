"use client";
import { MantineProvider } from "@mantine/core";

export const MantineWrapper = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ primaryColor: "violet" }}
    >
      {children}
    </MantineProvider>
  );
};
