import prisma from "../utils/prisma";

export const createTaskRepo = (data: any) => {
  return prisma.task.create({ data });
};

export const findTaskByIdRepo = (id: string) => {
  return prisma.task.findUnique({
    where: { id },
    include: { creator: true, assignedTo: true },
  });
};

export const updateTaskRepo = (id: string, data: any) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTaskRepo = (id: string) => {
  return prisma.task.delete({ where: { id } });
};

export const listTasksRepo = (filters: any) => {
  return prisma.task.findMany({
    where: filters,
    orderBy: { dueDate: "asc" },
    include: { creator: true, assignedTo: true },
  });
};
