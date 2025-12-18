import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/task.api";

const schema = z.object({
  title: z.string().min(1),
  description: z.string(),
  dueDate: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

export default function CreateTaskForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
    onError: (error) => {
      console.error("Create task error:", error);
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Error response:", err.response?.data);
    },
  });

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      
      <form
        onSubmit={handleSubmit((data) =>
          mutation.mutate({
            ...data,
            status: "TODO",
          })
        )}
      >
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          {...register("dueDate")}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select 
          {...register("priority")} 
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <button 
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Adding..." : "Add Task"}
        </button>

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            Failed to create task: {
              ((mutation.error as { response?: { data?: { message?: string } } })?.response?.data?.message) || 
              "Unknown error"
            }
          </p>
        )}
      </form>
    </div>
  );
}
