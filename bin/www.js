import { app } from '../app.js'
import { normalizePort, onError, onListening } from '../src/helpers.js'
import http from 'http'
import { Server } from "socket.io";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Create HTTP server.
export const server = http.createServer(app);

// Socket io
export const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("message", "Testing Message");
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);