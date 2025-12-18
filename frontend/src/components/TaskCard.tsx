import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, deleteTask } from "../api/task.api";
import type { Task } from "../types/task";

const statusColor: Record<string, string> = {
  TODO: "bg-gray-200 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  REVIEW: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

const priorityColor: Record<string, string> = {
  LOW: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-rose-100 text-rose-700",
};

export default function TaskCard({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (status: Task["status"]) =>
      updateTask(task.id, { status }),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );

      return { previous };
    },
    onError: (_err, _new, context) => {
      queryClient.setQueryData(["tasks"], context?.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 border-l-4 border-indigo-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h3>
        <button
          onClick={() => deleteMutation.mutate()}
          className="text-sm text-red-500 hover:underline"
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "..." : "Delete"}
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${statusColor[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </span>

        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="text-xs text-gray-400 mt-3">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>
    </div>
  );
}
