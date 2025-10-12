export default function Loading() {
  return (
    <div className="p-6">
      {/* Page header skeleton */}
      <div className="h-8 w-60 bg-gray-200 rounded animate-pulse mb-6"></div>

      {/* Toggle buttons skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-2 px-3">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-2 px-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-2 px-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
