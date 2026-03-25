"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
        >
          Event Manager
        </Typography>

        <Button color="inherit" href="/events">
          Events
        </Button>

        <Button color="inherit" href="/events/create">
          Create
        </Button>

      </Toolbar>

    </AppBar>
  );
}