export default function TaskFilters({
  onChange,
}: {
  onChange: (filters: any) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded shadow">
      <select
        className="border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          onChange({ status: e.target.value || undefined })
        }
      >
        <option value="">All Status</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="REVIEW">Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        className="border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) =>
          onChange({ priority: e.target.value || undefined })
        }
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>
    </div>
  );
}
