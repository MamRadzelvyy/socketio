const socket = io("http://localhost:3000");

const chat = document.getElementById("chat");
const usernameP = document.getElementById("usernameP");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const connectedUsers = document.getElementById("connectedUsers");
let username;

const sendUsername = () => {
  username = userInput.value;
  usernameP.innerHTML = `Username: ${username}`;
  const newUserP = `
        <p class="${username}-userlist">${username}</p>
`;
  connectedUsers.innerHTML += newUserP;
  sendButton.removeEventListener("click", sendUsername);
  socket.emit("new user connected", username);
};

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
