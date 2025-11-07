// pages/Artists/ArtistProfile.tsx
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ARTISTS_DATA } from "@/data/artistProfile";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  
  // Find artist by ID
  const artist = ARTISTS_DATA.find(artist => artist.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Artist Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Section - Exactly like the image */}
      <div className="relative h-96 bg-gradient-to-r from-purple-500 to-pink-500">
        {/* Cover background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        {/* Profile Info - Centered inside the cover background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Avatar Circle */}
          <div className="mb-4">
            <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto shadow-lg overflow-hidden">
              {/* Avatar image */}
              <img 
                src={artist.avatarUrl} 
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-white mb-2">{artist.name}</h1>

          {/* Followers/Following */}
          <div className="flex justify-center items-center gap-6 mb-4 text-white">
            <div>
              <span className="font-semibold">{artist.followers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{artist.following}</span> following
            </div>
          </div>

          {/* Follow Button */}
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded-lg font-semibold">
            {artist.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </div>
  );
}