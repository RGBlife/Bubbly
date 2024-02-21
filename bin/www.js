import { app } from "../app.js";
import { normalizePort, onError, onListening } from "../src/helpers.js";
import http from "http";
import { Server } from "socket.io";

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

export const server = http.createServer(app);

export const io = new Server(server);

const colours = ["Orange", "Red", "Yellow", "Teal"];

io.on("connection", (socket) => {
  const name =
    colours.splice(Math.floor(Math.random() * (colours.length - 1)), 1)[0] ??
    "[No colours left bobby]";
  socket.emit("connectionMsg", `You are connected as ${name}`);

  console.log(`User connected: ${socket.id}`);

  socket.on("message", async (message, userId) => {
    const sockets = await io.fetchSockets();
    for (const sock of sockets) {
      if (message && sock.id !== socket.id) {
        sock.emit("message", message, name);
      }
    }
  });

  socket.on("disconnect", () => {
    colours.push(name);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
