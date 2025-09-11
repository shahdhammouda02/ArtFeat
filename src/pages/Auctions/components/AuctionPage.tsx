// src/pages/Auctions/components/AuctionPage.tsx
import AuctionBidView from "./AuctionBidView";
import ArtworkDetails from "./ArtworkDetails";
import BidHistorySection from "./BidHistorySection";
import SuggestedAuctions from "./SuggestedAuctions";

export default function AuctionPage({ id }: { id: number }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Auction Bid View */}
      <section className="bg-white py-12 sm:py-16">
        <AuctionBidView id={id} />
      </section>

      {/* Artwork Details Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <ArtworkDetails id={id} />
      </section>

      {/* Bid History Section */}
      <section className="py-12 sm:py-16 bg-white">
        <BidHistorySection />
      </section>

      {/* Suggested Auctions Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <SuggestedAuctions currentId={id} />
      </section>
    </div>
  );
}
