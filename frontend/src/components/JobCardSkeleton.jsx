export default function JobCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 animate-pulse">

      <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>

      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>

      <div className="h-4 w-1/2 bg-gray-300 rounded mb-6"></div>

      <div className="flex justify-between mb-6">
        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>

        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>

      <div className="h-10 w-full bg-gray-300 rounded-lg"></div>

    </div>
  );
}