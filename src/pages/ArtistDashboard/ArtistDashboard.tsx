import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Store,
  MapPin,
  Globe,
  Plus,
  BarChart2,
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
} from "lucide-react";
import { countries } from "@/data/countries";

const navItems = [
  "Artwork",
  "Collection",
  "Favorites",
  "About",
  "Sales Withdrawal",
];
const artworkSubItems = ["All Artworks", "Physical", "Digital"];

const ArtistDashboard = () => {
  const { user, isAuthenticated } = Auth();
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Artwork");
  const [activeSubNav, setActiveSubNav] = useState("All Artworks");

  // local state to prevent redirect on initial load
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (user && isAuthenticated !== undefined) {
      // only navigate after user data is loaded
      if (!isAuthenticated || user.type !== "artist") {
        navigate("/"); // redirect non-artists or unauthenticated users
      } else {
        setCheckingAuth(false); // user is valid, stop loading
      }
    }
  }, [user, isAuthenticated, navigate]);

  if (checkingAuth || !user) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      {/* Main Profile Card */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Profile Avatar */}
        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white border flex-shrink-0">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold">{user.name}</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mt-2">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mt-1">
            <Store size={18} />
            <span>{user.storename}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mt-1">
            <Globe size={18} />
            <span>
              {user.country
                ? countries[user.country as keyof typeof countries]?.name
                : "Unknown Country"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 mt-1">
            <MapPin size={18} />
            <span>{user.city ? user.city : "Unknown City"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <Button className="bg-sky-500 text-white hover:bg-sky-600 flex-1">
            <Plus className="mr-1" /> Add Artwork
          </Button>
          <Button variant="outline" className="flex-1">
            Add Collection
          </Button>
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 max-w-6xl w-full">
        {/** Example card */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-md text-sky-500 font-medium">Total Funds</p>
            <BarChart2 size={24} className="text-gray-700" />
          </div>
          <p className="text-lg font-bold mt-2">$12,450</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-md text-sky-500 font-medium">Total Sales</p>
            <ShoppingCart size={24} className="text-gray-700" />
          </div>
          <p className="text-lg font-bold mt-2">87</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-md text-sky-500 font-medium">Followers</p>
            <Users size={24} className="text-gray-700" />
          </div>
          <p className="text-lg font-bold mt-2">2.5K</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-md text-sky-500 font-medium">Following</p>
            <UserCheck size={24} className="text-gray-700" />
          </div>
          <p className="text-lg font-bold mt-2">210</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-md text-sky-500 font-medium">Avg. Sale Price</p>
            <DollarSign size={24} className="text-gray-700" />
          </div>
          <p className="text-lg font-bold mt-2">$143</p>
        </div>
      </div>

     {/* Navigation Buttons Section */}
<div className="w-full max-w-6xl flex flex-col items-center mt-6 mb-6">
  {/* Main Nav Buttons */}
  <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
    {navItems.map((item) => (
      <Button
        key={item}
        variant="outline"
        className={`
          flex-1 rounded-none border-gray-200 py-3
          ${activeNav === item ? "bg-white text-black hover:bg-white" : "bg-gray-200 text-gray-700 hover:bg-gray-200"}
        `}
        onMouseDown={() => setActiveNav(item)}
        onClick={() => setActiveNav(item)}
      >
        {item}
      </Button>
    ))}
  </div>

  {/* Artwork Sub Buttons */}
  {activeNav === "Artwork" && (
    <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0 mt-4">
      {artworkSubItems.map((subItem) => (
        <Button
          key={subItem}
          variant="outline"
          className={`
            flex-1 rounded-none border-gray-200 py-3
            ${activeSubNav === subItem ? "bg-white" : "bg-gray-200"}
            text-sky-500
            hover:bg-white hover:text-sky-600
          `}
          onMouseDown={() => setActiveSubNav(subItem)}
          onClick={() => setActiveSubNav(subItem)}
        >
          {subItem}
        </Button>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default ArtistDashboard;
