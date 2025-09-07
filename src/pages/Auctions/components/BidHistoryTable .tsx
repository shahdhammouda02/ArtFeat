import type { BidEntry } from "@/types/bidHistory"
import { bidHistory } from "@/data/bidHistory"

const BidHistoryTable  = () => {
  return (
   <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Bidder</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Bid Amount</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Date/Time</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {bidHistory.map((bid: BidEntry, index: number) => (
            <tr key={index}>
              <td className="px-4 py-3">{bid.bidder}</td>
              <td className="px-4 py-3 font-medium">{bid.amount}</td>
              <td className="px-4 py-3">{bid.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BidHistoryTable 
