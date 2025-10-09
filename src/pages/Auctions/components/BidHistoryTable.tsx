import type { BidEntry } from "@/types/bidHistory"
import { bidHistory } from "@/data/bidHistory"

const BidHistoryTable = () => {
  return (
    <div className="bg-white w-full max-w-[520px] mx-auto">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-sky-50">
          <tr>
            <th className="w-[30%] px-4 py-2 text-left font-semibold text-gray-900 text-sm">Bidder</th>
            <th className="w-[35%] px-4 py-2 text-left font-semibold text-gray-900 text-sm">Amount</th>
            <th className="w-[35%] px-4 py-2 text-left font-semibold text-gray-900 text-sm">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bidHistory.map((bid: BidEntry, index: number) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-4 py-2">
                <div className="font-medium text-gray-900">{bid.bidder}</div>
              </td>
              <td className="px-4 py-2">
                <div className="font-bold text-sky-600 text-lg">{bid.amount}</div>
              </td>
              <td className="px-4 py-2">
                <div className="text-gray-600 text-sm">{bid.date}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BidHistoryTable 
