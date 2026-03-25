"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TextField, Button, Stack, Typography } from "@mui/material";

export default function EditEventPage() {
  const params = useParams();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${params.id}`)
      .then((res) => res.json())
      .then(setForm);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:3001/events/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.href = "/events";
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Edit Event</Typography>

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

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" href={`/events/${form.id}`}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}