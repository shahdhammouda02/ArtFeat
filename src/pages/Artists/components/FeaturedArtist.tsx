import { Star, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ARTISTS_DATA } from "@/data/artistProfile";

export default function FeaturedArtist() {
  const navigate = useNavigate();

  // ✅ الحل: غيرنا نوع البراميتر من string إلى number
  const handleVisitProfile = (artistId: number) => {
    navigate(`/artists/${artistId}`);
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0b1b34] via-[#0f1f3f] to-[#0b1b34] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <Button
            variant="outline"
            className="bg-[#0f1f3f] border border-[#2b3c60] text-white hover:bg-[#1a2a4d] rounded-full px-5"
          >
            <Trophy className="w-4 h-4 mr-2 text-sky-400" /> Monthly Leaderboard
          </Button>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent">
          Top Artists for this Month
        </h2>

        <p className="text-gray-300 mt-3 mb-8">
          Celebrating our most talented creators who are shaping the future
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
          {ARTISTS_DATA.map((artist) => (
            <div
              key={artist.id}
              className="relative bg-[#009fc2] rounded-2xl p-6 shadow-lg w-56 transform hover:scale-105 transition duration-300"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="bg-yellow-400 rounded-full px-3 py-1 text-black font-bold shadow-md flex items-center gap-1">
                  <Star className="w-4 h-4 text-black" />
                  {artist.followers}
                </div>
              </div>

              <div className="mt-4">
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-cyan-200 object-cover shadow-md"
                />
              </div>

              <h3 className="mt-4 font-bold text-lg">{artist.name}</h3>

              <div className="mt-3">
                <Button
                  asChild
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full text-sm shadow-md"
                  onClick={() => handleVisitProfile(artist.id)}
                >
                  <a href="#">Visit Profile</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button
            asChild
            className="bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold py-5 px-10 rounded-full shadow-lg hover:opacity-90 transition"
          >
            <a href="/signup-artist">
              <Users className="w-5 h-5 mr-2" />
              Join 1,234+ talented artists
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// import { Star, Trophy, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router";
// import { ARTISTS_DATA } from "@/data/artistProfile";


// export default function FeaturedArtist() {
//   const navigate = useNavigate();
//    const handleVisitProfile = (artistId: string) => {
//     navigate(`/artists/${artistId}`); // Navigate to artist profile page
//   };
//   return (
//     <section className="relative py-20 bg-gradient-to-b from-[#0b1b34] via-[#0f1f3f] to-[#0b1b34] text-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         {/* العنوان */}
//         <div className="flex justify-center mb-4">
//           <Button
//             variant="outline"
//             className="bg-[#0f1f3f] border border-[#2b3c60] text-white hover:bg-[#1a2a4d] rounded-full px-5"
//           >
//             <Trophy className="w-4 h-4 mr-2 text-sky-400" /> Monthly Leaderboard
//           </Button>
//         </div>

//         <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent">
//           Top Artists for this Month
//         </h2>

//         <p className="text-gray-300 mt-3 mb-8">
//           Celebrating our most talented creators who are shaping the future
//         </p>

//         {/* البطاقات */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
//           {ARTISTS_DATA.map((artist) => (
//             <div
//               key={artist.id}
//               className="relative bg-[#009fc2] rounded-2xl p-6 shadow-lg w-56 transform hover:scale-105 transition duration-300"
//             >
//               <div className="absolute -top-5 left-1/2 -translate-x-1/2">
//                 <div className="bg-yellow-400 rounded-full px-3 py-1 text-black font-bold shadow-md flex items-center gap-1">
//                   <Star className="w-4 h-4 text-black" />
//                   {artist.followers}
//                 </div>
//               </div>

//               {/* الصورة */}
//               <div className="mt-4">
//                 <img
//                   src={artist.avatarUrl}
//                   alt={artist.name}
//                   className="w-24 h-24 mx-auto rounded-full border-4 border-cyan-200 object-cover shadow-md"
//                 />
//               </div>

//               {/* الاسم */}
//               <h3 className="mt-4 font-bold text-lg">{artist.name}</h3>

//               {/* الزر */}
//               <div className="mt-3">
//                 <Button
//                   asChild
//                   className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full text-sm shadow-md"
//                   onClick={() => handleVisitProfile(artist.id)}
//                 >
//                   <a href="">Visit Profile</a>
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* الزر السفلي */}
//         <div className="mt-12">
//           <Button
//             asChild
//             className="bg-gradient-to-r from-sky-500 to-teal-400 text-white font-semibold py-5 px-10 rounded-full shadow-lg hover:opacity-90 transition"
//           >
//             <a href="/signup-artist">
//               <Users className="w-5 h-5 mr-2" />
//               Join 1,234+ talented artists
//             </a>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }
