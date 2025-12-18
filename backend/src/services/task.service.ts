import {
  createTaskRepo,
  deleteTaskRepo,
  findTaskByIdRepo,
  listTasksRepo,
  updateTaskRepo,
} from "../repositories/task.repository";

export const createTask = async (
  userId: string,
  payload: any
) => {
  return createTaskRepo({
    ...payload,
    creatorId: userId,
    assignedToId: payload.assignedToId || userId,
    dueDate: new Date(payload.dueDate),
  });
};

export const getTasks = async (userId: string, query: any) => {
  const filters: any = {};

  if (query.status) filters.status = query.status;
  if (query.priority) filters.priority = query.priority;

  if (query.type === "assigned") {
    filters.assignedToId = userId;
  }

  if (query.type === "created") {
    filters.creatorId = userId;
  }

  if (query.type === "overdue") {
    filters.dueDate = { lt: new Date() };
    filters.status = { not: "COMPLETED" };
  }

  return listTasksRepo(filters);
};

export const updateTask = async (
  taskId: string,
  userId: string,
  payload: any
) => {
  const task = await findTaskByIdRepo(taskId);
  if (!task) throw new Error("Task not found");

  if (task.creatorId !== userId && task.assignedToId !== userId) {
    throw new Error("Unauthorized");
  }

  return updateTaskRepo(taskId, payload);
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await findTaskByIdRepo(taskId);
  if (!task) throw new Error("Task not found");

  if (task.creatorId !== userId) {
    throw new Error("Only creator can delete task");
  }

  return deleteTaskRepo(taskId);
};
