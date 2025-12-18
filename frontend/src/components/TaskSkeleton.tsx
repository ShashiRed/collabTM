export default function TaskSkeleton() {
  return (
    <div className="border rounded p-4 bg-white shadow animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-3" />

      <div className="flex justify-between">
        <div className="h-3 bg-gray-300 rounded w-20" />
        <div className="h-3 bg-gray-300 rounded w-16" />
      </div>
    </div>
  );
}
