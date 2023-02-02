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

// Include the toastr library
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script> */}

// // Show the toaster message
// toastr.success('You are connected');

// // Make the toaster message disappear after 5 seconds
// setTimeout(function() {
//   toastr.clear();
// }, 5000);

// Socket io
export const io = new Server(server);

const colours = ['Orange', 'Red', 'Yellow', 'Teal']

io.on("connection", (socket) => {
  const name = colours.splice(Math.floor(Math.random() * (colours.length - 1)), 1) ?? '[No colours left bobby]'
  socket.emit("message", `You are connected as ${name}`);

  setTimeout(function() {
    socket.emit("clearToaster");
  }, 5000);

  socket.on('message', (message) => {
    if (message) {
      io.sockets.emit('message', `${message} by ${name}`)
    }
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