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
  const [recommended, setRecommended] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${params.id}`)
      .then(res => res.json())
      .then(setEvent);

    fetch(`http://localhost:3001/events/${params.id}/recommendations`)
      .then(res => res.json())
      .then(setRecommended);
  }, [params.id]);

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
            
            <Button
                color="error"
                variant="outlined"
                onClick={async () => {
                    if (confirm('Are you sure you want to delete this event?')) {
                    await fetch(`http://localhost:3001/events/${event.id}`, { method: 'DELETE' });
                    window.location.href = '/events';
                    }
                }}
                >
                Delete
            </Button>
            <Button href="/events" variant="outlined">
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <h2>Recommended Events</h2>
      {recommended.length > 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Recommended Events
            </Typography>
            <Stack spacing={1}>
              {recommended.map(e => (
                <Card key={e.id} variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">{e.title}</Typography>
                    <Typography variant="body2">{e.date.slice(0, 10)}</Typography>
                    <Typography variant="body2">Category: {e.category}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ) : <p>Currently no similar events.</p>}
    </Stack>
  );
}