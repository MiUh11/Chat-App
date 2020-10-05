console.log("main.js");
const socket = io();
console.log("socket", socket);

const usersNumberElement = document.createElement("h1");

const buttonElement = document.querySelector("#chat-form button");
const inputElement = document.getElementById("chat-message");

const addMessage = (payload, mine = true) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message-wrapper");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (mine) {
    messageElement.classList.add("message-sent");
  } else {
    messageElement.classList.add("message-received");
  }

  messageElement.innerText = payload.message;

  const nameElement = document.createElement("p");
  nameElement.classList.add("clientName");
  nameElement.innerText = payload.clientName;

  const avatarElement = document.createElement("img");
  avatarElement.src = payload.avatar;
  avatarElement.classList.add("avatar");

  messageElement.appendChild(avatarElement);
  messageElement.appendChild(nameElement);
  messageWrapper.appendChild(messageElement);

  const parentElement = document.getElementById("messages");

  parentElement.appendChild(usersNumberElement);
  parentElement.appendChild(messageWrapper);
};

buttonElement.addEventListener("click", (event) => {
  event.preventDefault();

  const payload = {
    message: inputElement.value,
    clientName: chance.string({ length: 5, pool: "abcde" }),
    avatar:
      "https://robohash.org/rerumperferendisalias.png?size=50x50&set=set1",
  };

  socket.emit("chat message", payload);
  console.log("payload", payload);
  addMessage(payload, true);
});

socket.on("chat message", (payload) => {
  console.log("message received", payload);
  addMessage(payload, false);
});

socket.on("user connected", (usersNumber) => {
  console.log(usersNumber);
  const onlineUser = document.getElementById("online-user");
  const onlineUserAvatae = document.createElement("p");
  onlineUserAvatae.innerText = "online";
  onlineUser.appendChild(onlineUserAvatae);
  console.log(`user is connected`);
});
socket.on("user disconnected", (usersNumber) => {
  console.log(usersNumber);
  const onlineUser = document.getElementById("offline-user");
  const onlineUserAvatae = document.createElement("p");
  onlineUserAvatae.innerText = "offline-user";
  onlineUser.appendChild(onlineUserAvatae);
  console.log("user disconected");
});
socket.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
