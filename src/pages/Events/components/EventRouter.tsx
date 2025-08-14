import { useParams, Navigate } from "react-router-dom";
import { ALL_EVENTS } from "@/data/eventsData";
import EventItem from "@/pages/Events/components/EventItem";
import UpcomingPage from "@/pages/Events/components/UpcomingPage";

export default function EventRouter() {
  const { id } = useParams();
  const event = ALL_EVENTS.find(e => e.id === Number(id));

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  return event.status === "Ended" ? 
    <EventItem /> : 
    <UpcomingPage />;
}