
const socket = io("http://localhost:3000");

const chat = document.getElementById("chat");
const usernameP = document.getElementById("usernameP");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
let username;


const sendUsername = () => {
    username = userInput.value;
    usernameP.innerHTML = `Username: ${username}`;
    socket.emit("new user connected", username);
}

sendButton.addEventListener("click", sendUsername);