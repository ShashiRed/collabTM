import api from "./axios";
import type { Task } from "../types/task";

export const fetchTasks = (params?: any): Promise<Task[]> =>
  api.get("/tasks", { params }).then((res) => res.data);

export const createTask = (data: Partial<Task>) =>
  api.post("/tasks", data).then((res) => res.data);

export const updateTask = (id: string, data: Partial<Task>) =>
  api.patch(`/tasks/${id}`, data).then((res) => res.data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);
