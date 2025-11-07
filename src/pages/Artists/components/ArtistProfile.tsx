// pages/Artists/ArtistProfile.tsx
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ARTISTS_DATA } from "@/data/artistProfile";
import { ArtworkCard } from "@/pages/Artists/components/ArtworkCard";
import { ITEMS } from "@/data/artworks";
import { useState } from "react";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'artwork' | 'collections' | 'about'>('artwork');

  // Find artist by ID
  const artist = ARTISTS_DATA.find((artist) => artist.id === id);
  const convertedArtworks = ITEMS.map((item) => ({
    id: item.id,
    title: item.title,
    price: parseFloat(item.price.replace("€", "").replace(",", "")),
    type: item.tag,
    img: item.img,
    sales: Math.floor(Math.random() * 100), // Add random sales data
    format: Math.random() > 0.5 ? "Digital" : "Physical", // Add format data
  }));

  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Artist Not Found</h1>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'artwork':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Featured artworks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertedArtworks.slice(0, 6).map((artwork) => (
                <ArtworkCard key={artwork.id} item={artwork} showFormatBadge={true} />
              ))}
            </div>
          </div>
        );
      
      case 'collections':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Collections
            </h2>
            <p className="text-gray-600 text-lg">
              test collection test sentence
            </p>
          </div>
        );
      
      case 'about':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About
            </h2>
            <p className="text-gray-600 text-lg">
              test about test sentence
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

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
              <span className="font-semibold">{artist.followers}</span>{" "}
              followers
            </div>
            <div>
              <span className="font-semibold">{artist.following}</span>{" "}
              following
            </div>
          </div>

          {/* Follow Button */}
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded-lg font-semibold">
            {artist.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-8 py-6 mt-10">
        <Button
          variant="ghost"
          className={`text-lg font-semibold hover:text-sky-600 hover:bg-transparent ${
            activeTab === 'artwork' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('artwork')}
        >
          Artwork
        </Button>
        <Button
          variant="ghost"
          className={`text-lg font-semibold hover:text-sky-600 hover:bg-transparent ${
            activeTab === 'collections' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('collections')}
        >
          Collections
        </Button>
        <Button
          variant="ghost"
          className={`text-lg font-semibold hover:text-sky-600 hover:bg-transparent ${
            activeTab === 'about' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('about')}
        >
          About
        </Button>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
}