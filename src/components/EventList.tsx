import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { Event, setEvents } from "../slices/eventSlice";
import { fetchEvents } from "../services/events";

const EventList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, isLoading } = useQuery("events", fetchEvents);

  React.useEffect(() => {
    if (data) {
      dispatch(setEvents(data));
    }
  }, [data, dispatch]);

  if (isLoading)
    return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        Error fetching events
      </Typography>
    );

  return (
    <Box padding={4}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          color: "text.primary",
          marginBottom: 4,
          fontWeight: "bold",
        }}
      >
        Event List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {data.map((event: Event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {event.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {event.location}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;
