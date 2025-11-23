import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Store, MapPin, Globe, Plus } from "lucide-react";
import { countries } from "@/data/countries";

const ArtistDashboard = () => {
  const { user, isAuthenticated } = Auth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // redirect to home
    }
    if (user?.type !== "artist") {
      navigate("/"); // prevent normal users from entering artist dashboard
    }
  }, [isAuthenticated, navigate, user]);

  // In case no user data exists
  if (!user) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
  <div className="w-full flex justify-center py-10 px-4">
  <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-8 flex gap-6 items-center">
    {/* Profile Avatar */}
    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white border">
      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
    </div>

    {/* Info Section */}
    <div className="flex-1">
      <h2 className="text-2xl font-bold">{user.name}</h2>

      {/* Email */}
      <div className="flex items-center gap-2 text-gray-600 mt-2">
        <Mail size={18} />
        <span>{user.email}</span>
      </div>

      {/* Store Name */}
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <Store size={18} />
        <span>{user.storename}</span>
      </div>

      {/* Country */}
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <Globe size={18} />
        <span>
          {user.country ? countries[user.country as keyof typeof countries]?.name : "Unknown Country"}
        </span>
      </div>

      {/* City */}
      <div className="flex items-center gap-2 text-gray-600 mt-1">
        <MapPin size={18} />
        <span>
          {user.city ? user.city : "Unknown City"}
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-4">
      <Button className="bg-sky-500 text-white hover:bg-sky-600"><span><Plus /></span> Add Artwork</Button>
      <Button variant="outline">Add Collection</Button>
      <Button variant="outline">Edit Profile</Button>
    </div>
  </div>
</div>

  );
};

export default ArtistDashboard;
