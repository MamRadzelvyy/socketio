const socket = io("http://localhost:3000");

const chat = document.getElementById("chat");
const usernameP = document.getElementById("usernameP");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const connectedUsers = document.getElementById("connectedUsers");
let username;

const sendUsername = () => {
  username = userInput.value;
  sendButton.removeEventListener("click", sendUsername);
  userInput.value = "";
  sendButton.addEventListener("click", sendMessage);
  socket.emit("new user connected", username);
};

const sendMessage = () => {
  let userMessage = userInput.value;
  socket.emit("chat", userMessage);
  userInput.value = "";
}

sendButton.addEventListener("click", sendUsername);

socket.on("new user connected", (data) => {
  data.map((user) => {
    if (document.querySelector(`.${user}-userlist`)) return;
    const newUserP = `
        <p class="${user}-userlist">${user}</p>
`;
    connectedUsers.innerHTML += newUserP;
  });
});

socket.on("chat", (data) => {
  chat.innerHTML += `<p>${data}</p>`;
})