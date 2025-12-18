import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/task.service";
import { io } from "../server";

export const createTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = CreateTaskDto.parse(req.body);
    const task = await createTask(req.userId!, data);
    
    // Emit socket event for real-time update
    io.emit("task:created", task);
    
    // If task is assigned, emit notification
    if (data.assignedToId) {
      io.emit("task:assign", {
        assignedToId: data.assignedToId,
        taskTitle: task.title,
      });
    }
    
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasksHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const tasks = await getTasks(req.userId!, req.query);
  res.json(tasks);
};

export const updateTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = UpdateTaskDto.parse(req.body);
    const task = await updateTask(req.params.id, req.userId!, data);
    
    // Emit socket event for real-time update
    io.emit("task:updated", task);
    
    res.json(task);
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

export const deleteTaskHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await deleteTask(req.params.id, req.userId!);
    res.status(204).send();
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};
