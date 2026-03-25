"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then(setEvents)
      .then(console.log);
  }, []);

  return (
    <Stack spacing={2}>

      <Typography variant="h4">
        Events
      </Typography>

      {events && Array.isArray(events) && events.map((e) => (

        <Card key={e.id}>

          <CardContent>

            <Typography variant="h6">
              {e.title}
            </Typography>

            <Typography>
              {e.description}
            </Typography>

            <Typography>
              {e.location}
            </Typography>

            <Typography>
              {e.date}
            </Typography>

            <Button href={`/events/${e.id}`}>
              Details
            </Button>

            <Button href={`/events/edit/${e.id}`}>
              Edit
            </Button>

          </CardContent>

        </Card>

      ))}

      <Button
        variant="contained"
        href="/events/create"
      >
        Create event
      </Button>

    </Stack>
  );
}