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

const colours = ['orange', 'red', 'yellow', 'teal']

io.on("connection", (socket) => {
  const name = colours.splice(Math.floor(Math.random() * (colours.length - 1)), 1) ?? '[No colours left bobby]'
  socket.emit("message", "You are connected");

  socket.on('message', (message) => {
    io.sockets.emit('message', message, name)
  })

  socket.on('disconnect', () => {
    colours.push(name)
  })
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);