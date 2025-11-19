import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "@/App";
import Events from "@/pages/Events/Events";
import EventRouter from "@/pages/Events/components/EventRouter";
import Auctions from "@/pages/Auctions/Auctions";
import SupportArtist from "@/pages/Support_Artist/SupportArtist";
import Artists from "@/pages/Artists/Artists";
import Artworks from "@/pages/Artworks/Artworks";
import ArtistProfile from "@/pages/Artists/components/ArtistProfile";
import SignIn from "@/pages/auth/signin/SignIn";
import SignUp from "@/pages/auth/signup/SignUp";
import ArtistSignUp from "@/pages/auth/artistSignup/ArtistSignUp";
import Photography from "@/pages/Photography/Photography";
import Details from "@/pages/Details/Details";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/auctions" replace /> },
      { path: "events", element: <Events /> },
      { path: "events/:id", element: <EventRouter /> },
     { path: "auctions", element: <Auctions /> },
      { path: "auctions/:id", element: <Auctions /> },
      { path: "support-artist", element: <SupportArtist /> },
       { path: "artists", element: <Artists /> },
       { path: "artists/:id", element: <ArtistProfile /> },
       { path: "all-artworks", element: <Artworks/> },
      {path: "signin", element: <SignIn />},
      {path: "signup", element: <SignUp />},
      {path: "artist-signup", element: <ArtistSignUp />},

   { path: "support-artist", element: <SupportArtist /> },
      { path: "artists", element: <Artists /> },
      { path: "artists/:id", element: <ArtistProfile /> },
      { path: "all-artworks", element: <Artworks /> },
      { path: "artworks/:id", element: <Details /> },
      { path: "photography", element: <Photography /> },
    ],
  },
];
