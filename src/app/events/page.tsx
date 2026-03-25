"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
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
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then(setEvents)
      .then(console.log);
  }, []);

    const filteredEvents = events
    .filter(e => !categoryFilter || e.category === categoryFilter)
    .sort((a, b) => sortOrder === 'asc'
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

return (
    <Stack spacing={2}>
      {/* Filters */}
      <Stack direction="row" spacing={2}>
        <Select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Workshop">Workshop</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Networking">Networking</MenuItem>
        </Select>

        <Select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <MenuItem value="asc">Date Ascending</MenuItem>
          <MenuItem value="desc">Date Descending</MenuItem>
        </Select>
      </Stack>

      {/* Event Cards */}
      {filteredEvents.map(event => (
        <Card key={event.id}>
        <CardContent>

            <Typography variant="h6">
              {event.title}
            </Typography>

            <Typography>
              {event.description}
            </Typography>

            <Typography>
              {event.location}
            </Typography>

            <Typography>
              {event.date}
            </Typography>

            <Button href={`/events/${event.id}`}>
              Details
            </Button>

            <Button href={`/events/edit/${event.id}`}>
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