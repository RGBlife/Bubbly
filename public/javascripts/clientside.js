const socket = io();
const chatbox = document.getElementsByClassName('chatbox')[0]
console.log("Hello world");
// client-side
socket.on("connect", () => {
});


socket.on('message', (text) => {
  const element = document.createElement('div');
  element.classList.add('message');
  element.textContent = text;
  chatbox.appendChild(element);
  chatbox.scrollTop = chatbox.scrollHeight;
});



socket.on("disconnect", () => {
  console.log(socket.id);
});

// Handling message submits from the textbox
const msgButton = document.getElementsByClassName("message-button")[0];
const textBoxMsg = document.getElementsByClassName("textbox")[0];
msgButton.addEventListener("click", (event) => {
  const text = textBoxMsg.value
  console.log('text', text)
  socket.emit('message', text)
});


// Load button,textbox and allow to submit text by pressing enter
window.onload = () => {
  const textInput = document.getElementById("textInput");
  const msgbtn = document.getElementById("msgBtn");
  
  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      msgbtn.click();
      textInput.value = "";
    }
  })
}
