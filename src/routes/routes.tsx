import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "@/App";
import Events from "@/pages/Events/Events";
import EventRouter from "@/pages/Events/components/EventRouter";
import Auctions from "@/pages/Auctions/Auctions";
import SupportArtist from "@/pages/Support_Artist/SupportArtist";
import Artists  from "@/pages/Artists/Artists";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/auctions" replace /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventRouter />},
      { path: "auctions", element: <Auctions /> },
      { path: "auctions/:id", element: <Auctions /> },
      { path: "support-artist", element: <SupportArtist /> },
       { path: "artists", element: <Artists /> },

    ],
  },
];
