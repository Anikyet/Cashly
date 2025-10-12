import { Banknote, CheckCircle2, Clock, XCircle } from "lucide-react";

const renderStatus = (status: string) => {
  switch (status) {
    case "Success":
      return (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4" /> Success
        </span>
      );
    case "Processing":
      return (
        <span className="flex items-center gap-1 text-yellow-600 font-medium">
          <Clock className="w-4 h-4" /> Processing
        </span>
      );
    case "Failed":
      return (
        <span className="flex items-center gap-1 text-red-600 font-medium">
          <XCircle className="w-4 h-4" /> Failed
        </span>
      );
    default:
      return <span className="text-gray-600">{status}</span>;
  }
};
export const BankTransactionList = ({
  id,
  provider,
  amount,
  startTime,
  status,
}: any) => {
  return (
    <tr key={id} className="border-b hover:bg-gray-50">
      <td className="py-2 px-3 flex items-center gap-2">
        <Banknote className="text-blue-500 w-4 h-4" /> {provider}
      </td>
      <td className="px-3 text-blue-600 font-medium">
        + ₹{(amount / 100).toLocaleString()}
      </td>
      <td className="px-3">{renderStatus(status)}</td>
      <td className="px-3">
        {new Date(startTime).toLocaleString("en-GB", {
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
