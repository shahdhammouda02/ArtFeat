import type { RouteObject } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home/Home";
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
import ArtistDashboard from "@/pages/ArtistDashboard/ArtistDashboard";
import AddArtwork from "@/pages/ArtistDashboard/components/add-artwork/AddArtwork";
import CreateCollection from "@/pages/ArtistDashboard/components/create-collection/CreateCollection ";
import Gallery from "@/pages/Gallery/Gallery";
import EditProfile from "@/pages/ArtistDashboard/components/edit-profile/EditProfile";
import WhoWeAre from "@/pages/WhoWeAre/WhoWeAre";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // { index: true, element: <Navigate to="/auctions" replace /> },
       { index: true, element: <Home /> },
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
      { path: "artist-dashboard", element: <ArtistDashboard /> },
      { path: "artist-dashboard/add-artwork", element: <AddArtwork /> },
      { path: "artist-dashboard/create-collection", element: <CreateCollection /> },
      {path: "artist-dashboard/edit-profile", element: <EditProfile />},

   { path: "support-artist", element: <SupportArtist /> },
      { path: "artists", element: <Artists /> },
      { path: "artists/:id", element: <ArtistProfile /> },
      { path: "all-artworks", element: <Artworks /> },
      { path: "artworks/:id", element: <Details /> },
      { path: "photography", element: <Photography /> },
        { path: "printmaking", element: <Photography /> },
          { path: "abstract-art", element: <Photography /> },
            { path: "paintings", element: <Photography /> },
      { path: "gallery", element: <Gallery /> },
      { path: "who-we-are", element: <WhoWeAre /> },


    ],
  },
];
