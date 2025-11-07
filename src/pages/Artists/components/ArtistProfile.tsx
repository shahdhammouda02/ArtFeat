import { useParams } from "react-router-dom";
import { getArtistById } from "@/data/artistProfile";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const artist = getArtistById(id || "");

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
          <p className="text-xl">No artist found with ID: <strong>{id}</strong></p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Artist Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img
              src={artist.avatarUrl}
              alt={artist.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-200"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-800">{artist.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{artist.level}</p>
              <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  Rank #{artist.rank}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-gray-800">Followers</h3>
              <p className="text-2xl font-bold text-cyan-600">
                {(artist.followers / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-gray-800">Artworks</h3>
              <p className="text-2xl font-bold text-cyan-600">{artist.artworks}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-gray-800">Rating</h3>
              <p className="text-2xl font-bold text-cyan-600">{artist.rating}/5</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Artist</h2>
            <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Go Back
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg">
              Follow Artist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}