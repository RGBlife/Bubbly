const socket = io();
console.log("Hello world");
// client-side
socket.on("connect", () => {
});

socket.on('message', (arg) => {
  console.log(arg)
})

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});