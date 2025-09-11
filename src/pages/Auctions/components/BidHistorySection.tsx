import { Clock, DollarSign, Users } from "lucide-react";
import BidHistoryTable from "./BidHistoryTable";
import { bidHistory } from "@/data/bidHistory";

const getNum = (v: string | number) =>
  typeof v === "number" ? v : Number(String(v).replace(/[^0-9.]/g, "")) || 0;

export default function BidHistorySection() {
  const total = bidHistory.length;
  const amounts = bidHistory.map((b) => getNum(b.amount));
  const highest = amounts.length ? Math.max(...amounts) : 0;
  const average = amounts.length
    ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length)
    : 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Bid History</h2>
        <p className="mt-2 text-md sm:text-md text-gray-600">
          Track the bidding activity and see how the auction is progressing.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-sky-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-500 rounded-full mb-4">
                <Clock size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm font-medium text-gray-600">Total Bids</div>
            </div>

            <div className="bg-sky-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-500 rounded-full mb-4">
                <DollarSign size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${highest.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600">Highest Bid</div>
            </div>

            <div className="bg-sky-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-500 rounded-full mb-4">
                <Users size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${average.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600">Average Bid</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bids</h3>
            <BidHistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
