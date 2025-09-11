// // import HeroSection from "./components/HeroSection"
// // import Section2 from "./components/Section2"

// // const Auctions = () => {
// //   return (
// //     <div className="space-y-16">
// //       <HeroSection />
// //       <Section2 />
// //     </div>
// //   )
// // }

// // export default Auctions
// import { useSearchParams, useNavigate } from "react-router-dom";
// import HeroSection from "./components/HeroSection";
// import Section2 from "./components/Section2";
// import AuctionBidView from "./components/AuctionBidView";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";

// export default function Auctions() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const bid = params.get("bid");

// if (bid) {
//   return (
//     <div className="space-y-4"> {/* كانت space-y-6 */}
//       <div className="max-w-6xl mx-auto px-4 pt-2"> {/* كانت pt-6 */}
//         <Button
//           variant="ghost"
//           onClick={() => navigate("/auctions", { replace: true })}
//           className="mb-4 p-0 h-auto text-gray-700 hover:text-sky-600 hover:bg-transparent inline-flex items-center gap-1"
//         >
//           <ChevronLeft size={18} />
//           <span>Back to Auctions</span>
//         </Button>
//       </div>
//       <AuctionBidView id={Number(bid)} />
//     </div>
//   );
// }


//   return (
//     <div className="space-y-16">
//       <HeroSection />
//       <Section2 />
//     </div>
//   );
// }


import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import HeroSection from "./components/HeroSection";
import Section2 from "./components/Section2";
import AuctionPage from "./components/AuctionPage";

export default function Auctions() {
  const [params] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const bidQuery = params.get("bid");
  const selectedId = id ?? bidQuery ?? undefined;

  // Scroll to top when auction page opens
  useEffect(() => {
    if (selectedId) {
      window.scrollTo(0, 0);
    }
  }, [selectedId]);

  if (selectedId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auctions", { replace: true })}
              className="text-gray-700 hover:text-sky-600 hover:bg-sky-50 inline-flex items-center gap-2 font-medium transition-all duration-200"
            >
              <ChevronLeft size={18} />
              <span>Back to Auctions</span>
            </Button>
          </div>
        </div>

        <AuctionPage id={Number(selectedId)} />
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <HeroSection />
      <Section2 />
    </div>
  );
}
