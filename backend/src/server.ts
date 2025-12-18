import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { initSockets } from "./sockets";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

initSockets(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
