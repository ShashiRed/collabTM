import { Server } from "socket.io";
import { taskSocket } from "./task.socket";

export const initSockets = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    taskSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
