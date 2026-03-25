"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
};

export default function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${params.id}`)
      .then((res) => res.json())
      .then(setEvent);
  }, []);

  if (!event) return <div>Loading...</div>;

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h4">{event.title}</Typography>
          <Typography variant="body1">{event.description}</Typography>
          <Typography variant="body2">Location: {event.location}</Typography>
          <Typography variant="body2">Date: {event.date}</Typography>
          <Typography variant="body2">Category: {event.category}</Typography>

          <Stack direction="row" spacing={2} marginTop={2}>
            <Button href={`/events/edit/${event.id}`} variant="contained">
              Edit
            </Button>
            <Button href="/events" variant="outlined">
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}