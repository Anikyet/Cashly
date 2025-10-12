"use client";

export default function Loading() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-3 bg-white shadow rounded-xl px-4 py-2 border">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Wallet Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow border p-6">
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-2xl shadow border p-6">
          <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
          <div className="flex gap-4">
            <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border"
          >
            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-8 w-28 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="border-b bg-gray-100">
            <tr>
              {[1, 2, 3, 4].map((i) => (
                <th key={i} className="py-2 px-3">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b">
                {[1, 2, 3, 4].map((j) => (
                  <td key={j} className="py-3 px-3">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
