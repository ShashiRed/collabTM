import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../api/task.api";
import { logout } from "../api/auth.api";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import CreateTaskForm from "../components/CreateTaskForm";
import NotificationBell from "../components/NotificationBell";
import TaskSkeleton from "../components/TaskSkeleton";
import { socket } from "../sockets/socket";

export default function Dashboard() {
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
    retry: 1,
    staleTime: 0,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });

  useEffect(() => {
    socket.connect();

    socket.on("task:updated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:created", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:deleted", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:updated");
      socket.off("task:created");
      socket.off("task:deleted");
      socket.disconnect();
    };
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">collabTM</h1>
          <p className="text-gray-500 text-sm">
            Collaborative Task Manager
          </p>
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <button
            onClick={() => logoutMutation.mutate()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

      <CreateTaskForm />

      <TaskFilters onChange={(f) => setFilters(f)} />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      )}
      {error && (
        <div className="text-red-500">
          <p>Failed to load tasks</p>
          <p className="text-sm">{String(error)}</p>
        </div>
      )}

      {!isLoading && !error && data && data.length === 0 && (
        <p className="text-gray-500">No tasks found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      </div>
    </div>
  );
}
