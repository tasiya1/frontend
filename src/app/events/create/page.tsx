"use client";

import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.href = "/events";
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Create Event</Typography>

      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
      />
      <TextField
        label="Date"
        name="date"
        value={form.date}
        onChange={handleChange}
        fullWidth
        placeholder="YYYY-MM-DDTHH:MM"
      />
      <TextField
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
      />

      <Button variant="contained" onClick={handleSubmit}>
        Create
      </Button>
    </Stack>
  );
}