import { Server, Socket } from "socket.io";
import { createNotification } from "../services/notification.service";

export const taskSocket = (io: Server, socket: Socket) => {
  socket.on("task:update", async (payload) => {
    // Broadcast updated task to all clients
    io.emit("task:updated", payload);
  });

  socket.on("task:assign", async (payload) => {
    const { assignedToId, taskTitle } = payload;

    const notification = await createNotification(
      assignedToId,
      `You were assigned to task: ${taskTitle}`
    );

    // Send notification only to assigned user
    io.emit(`notification:${assignedToId}`, notification);
    
    // Also emit generic notification event for frontend to refetch
    io.emit("notification");
  });
};
