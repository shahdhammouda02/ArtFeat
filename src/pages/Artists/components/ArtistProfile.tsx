import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ARTISTS_DATA } from "@/data/artistProfile";
import { ArtworkCard } from "@/pages/Artists/components/ArtworkCard";
import { ARTWORKS } from "@/data/artworks"; // ✅ استبدل ITEMS بـ ARTWORKS
import { useState } from "react";
import { CollectionCard } from "./CollectionCard";
import { COLLECTIONS_DATA } from "@/data/collection";
import { Heart } from "lucide-react";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"artwork" | "collections" | "about">("artwork");
  const [favoriteCollections, setFavoriteCollections] = useState<string[]>([]);

  // ✅ البحث عن الفنان حسب ID
  const artist = ARTISTS_DATA.find((artist) => artist.id === id);

  // ✅ تحويل بيانات الأعمال الفنية
  const convertedArtworks = ARTWORKS.map((item) => ({
    id: item.id,
    title: item.title,
    price: parseFloat(item.price.replace("€", "").replace(",", "")),
    type: item.tag,
    img: item.image, // ✅ استخدم image بدل img
    sales: Math.floor(Math.random() * 100),
    format: item.type, // ✅ استخدم type الحقيقي (Digital أو Physical)
  }));

  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Artist Not Found</h1>
      </div>
    );
  }

  // ✅ إدارة المفضلة في المجموعات
  const handleFavoriteToggle = (id: string) => {
    setFavoriteCollections((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // ✅ عرض المحتوى حسب التبويب
  const renderContent = () => {
    switch (activeTab) {
      case "artwork":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Featured Artworks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertedArtworks.slice(0, 6).map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  item={artwork}
                  showFormatBadge={true}
                />
              ))}
            </div>
          </div>
        );

      case "collections":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Featured Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLLECTIONS_DATA.map((collection) => {
                const isFavorite = favoriteCollections.includes(collection.id);
                return (
                  <div key={collection.id} className="relative group">
                    <CollectionCard
                      title={collection.title}
                      artworksCount={collection.artworksCount}
                      description={collection.description}
                      imageUrl={collection.imageUrl}
                    />
                    {/* ❤️ أيقونة المفضلة */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(collection.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-5 h-5 transition ${
                          isFavorite
                            ? "text-red-500 fill-red-500"
                            : "text-white/80"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              About {artist.name}
            </h2>

            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {artist.about.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard label="Member since" value={artist.about.memberSince} />
              <InfoCard label="Total artworks" value={artist.about.totalArtworks} />
              <InfoCard label="Style" value={artist.about.style} />
              <InfoCard
                label="Years of experience"
                value={artist.about.yearsOfExperience}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ✅ واجهة الصفحة الكاملة
  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 قسم الغلاف */}
      <div className="relative h-96 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* صورة الفنان */}
          <div className="mb-4">
            <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto shadow-lg overflow-hidden">
              <img
                src={artist.avatarUrl}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* الاسم والمتابعين */}
          <h1 className="text-2xl font-bold text-white mb-2">{artist.name}</h1>
          <div className="flex justify-center items-center gap-6 mb-4 text-white">
            <div>
              <span className="font-semibold">{artist.followers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{artist.following}</span> following
            </div>
          </div>

          {/* زر المتابعة */}
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded-lg font-semibold">
            {artist.isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* 🔹 أزرار التبويبات */}
      <div className="flex justify-center space-x-8 py-6 mt-10">
        {["artwork", "collections", "about"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`text-lg font-semibold hover:text-sky-600 hover:bg-transparent ${
              activeTab === tab
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-gray-600"
            }`}
            onClick={() =>
              setActiveTab(tab as "artwork" | "collections" | "about")
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* 🔹 المحتوى حسب التبويب */}
      <div className="container mx-auto px-4 py-8">{renderContent()}</div>
    </div>
  );
}

/** مكون فرعي لعرض بيانات الفنان في تبويب About */
function InfoCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">
        {label}
      </h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
