import type { RouteObject } from "react-router-dom";
import App from "@/App";
import Events from "@/pages/Events/Events";
import EventRouter from "@/pages/Events/components/EventRouter";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventRouter />},
      
    ],
  },
];
