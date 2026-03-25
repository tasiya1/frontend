"use client";

import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import Header from "../../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <CssBaseline />

          <Header />

          <Container maxWidth="md" style={{ marginTop: 40 }}>
            {children}
          </Container>

      </body>
    </html>
  );
}