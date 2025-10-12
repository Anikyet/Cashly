export default function Loading() {
  return (
    <div className="p-4">
      {/* Page title placeholder */}
      <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mb-8"></div>

      {/* Grid placeholders: AddMoney + BalanceCard */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {/* AddMoney Card Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 animate-pulse">
          {/* Card Title */}
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>

          {/* Amount input */}
          <div className="h-10 w-full bg-gray-200 rounded"></div>

          {/* Bank label */}
          <div className="h-4 w-24 bg-gray-200 rounded mt-4"></div>

          {/* Select input */}
          <div className="h-10 w-full bg-gray-200 rounded"></div>

          {/* Add Money button */}
          <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
        </div>

        {/* BalanceCard Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-48 animate-pulse"></div>
      </div>
    </div>
  );
}
