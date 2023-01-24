const socket = io();
const chatbox = document.getElementsByClassName('chatbox')[0]
console.log("Hello world");
// client-side
socket.on("connect", () => {
});

socket.on('message', (text, name) => {
  const element = document.createElement('div')
  element.classList.add('message')
  element.textContent = text + ` by ${name}`
  chatbox.appendChild(element)
})

socket.on("disconnect", () => {
  console.log(socket.id);
});

//Handling message submits from the textbox
const msgButton = document.getElementsByClassName("message-button")[0];
const textBoxMsg = document.getElementsByClassName("textbox")[0];
msgButton.addEventListener("click", (event) => {
  const text = textBoxMsg.value
  console.log('text', text)
  socket.emit('message', text)
});