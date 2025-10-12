"use clinet";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const P2PTransactionList = ({id,fromUserId,userId,toUser,fromUser,amount,timestamp}:any) => {
    console.log(toUser)
  return (
    <tr key={id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-3 flex items-center gap-2">
        {fromUserId === userId ? (
          <ArrowUpRight className="text-red-500 w-4 h-4" />
        ) : (
          <ArrowDownLeft className="text-green-500 w-4 h-4" />
        )}
        {fromUserId === userId ? "Sent" : "Received"}
      </td>
      <td className="px-3">
        {fromUserId === userId ? toUser : fromUser}
      </td>
      
      <td
        className={`px-3 font-medium ${
          fromUserId === userId ? "text-red-600" : "text-green-600"
        }`}
      >
        {fromUserId === userId
          ? `- ₹${(amount / 100).toLocaleString()}`
          : `+ ₹${(amount / 100).toLocaleString()}`}
      </td>
<td className="px-3">
  {new Date(timestamp).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}
</td>
    </tr>
  );
};
