export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[67vh]">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-5 animate-pulse">
        {/* Title bar */}
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>

        {/* Input fields */}
        <div className="space-y-4">
          <div className="h-10 w-full bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
