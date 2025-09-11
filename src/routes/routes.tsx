import type { RouteObject } from "react-router-dom";
import App from "@/App";
import Events from "@/pages/Events/Events";
import EventRouter from "@/pages/Events/components/EventRouter";
import Auctions from "@/pages/Auctions/Auctions";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventRouter />},
      { path: "auctions", element: <Auctions /> },
      { path: "auctions/:id", element: <Auctions /> },
    ],
  },
];
