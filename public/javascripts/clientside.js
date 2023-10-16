const socket = io();
const chatbox = document.getElementsByClassName('chatbox')[0]

// Show the toast initial you are connected welcome message

socket.on('connectionMsg', (connectionMessage) => {
  const chatbox = document.getElementById("chatbox");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = connectionMessage;
  toast.style.display = "block";
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  console.log("User connected: " + socket.id);
  console.log(connectionMessage);

  setTimeout(() => {
    toast.style.display = "none";
    toast.classList.remove("show"); 
  }, 3000);
});

function constructMsgClasses(str) {
  const defaultMsgClasses = 'py-2 px-3 my-4 mx-2 font-sans rounded-md text-left w-fit max-w-[50%]'
  return defaultMsgClasses + ' ' + str 
}

 // When a "message" event is received from the server, create a new <div> element with the message content, add it to the chatbox element, 
 // and scroll to the bottom of the chatbox to display the latest message
socket.on('message', (text, author) => {
  const element = document.createElement('div');
  const receivedClasses = "bg-white text-black"
  element.className = constructMsgClasses(receivedClasses);
  element.textContent = text;

  // const authorElement = document.createElement('div');
  // authorElement.textContent = author;
  // chatbox.appendChild(authorElement);

  chatbox.appendChild(element);
  chatbox.scrollTop = chatbox.scrollHeight;
});

// When the "message-button" is clicked, get the text from the "textbox" element and emit a "message" event to the server with the text and the current socket ID
const msgButton = document.getElementsByClassName("message-button")[0];
const textBoxMsg = document.getElementsByClassName("textbox")[0];

msgButton.addEventListener("click", (_event) => {
  const text = textBoxMsg.value
  socket.emit('message', text, socket.id) 

  // Display sender message
  const elementSender = document.createElement('div');
  const sentClasses = "bg-[#024dfe] ml-auto"
  elementSender.className = constructMsgClasses(sentClasses);
  elementSender.textContent = text;
  chatbox.appendChild(elementSender);
  chatbox.scrollTop = chatbox.scrollHeight;
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


// Default 'Enter Your Message Here' message for chatbox
const messageInput = document.getElementById('textInput');

messageInput.addEventListener('focus', (event) => {
  if (messageInput.value === 'Enter Your Message Here...') {
    messageInput.value = '';
    messageInput.classList.remove('textbox');
  }
});

messageInput.addEventListener('blur', (event) => {
  if (messageInput.value === '') {
    messageInput.value = 'Enter Your Message Here...';
    messageInput.classList.add('textbox');
  }
});

