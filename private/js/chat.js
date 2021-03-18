//create chat element
let chat = document.createElement("div");
chat.classList.add("chat");
let body = document.getElementsByTagName("body")[0];
body.appendChild(chat);

//create message displayer
let messageDisplayer = document.createElement("div");
messageDisplayer.classList.add("message-displayer");
chat.appendChild(messageDisplayer);

//create separator line
let line = document.createElement("div");
line.classList.add("line");
chat.appendChild(line);

//create input controls container
let inputControls = document.createElement("div");
inputControls.classList.add("input-controls");
chat.appendChild(inputControls);

// create input element
let input = document.createElement("textarea");
input.id = "user-input";
input.cols = 50;
input.rows = 6;
inputControls.appendChild(input);

// create send button
let sendButton = document.createElement("button");
sendButton.innerText = ">";
inputControls.appendChild(sendButton);

// creare mesaj

let messageContainer = document.createElement("div");
messageContainer.classList.add("message-container");

//message meta
let mesageMeta = document.createElement("header");
//numele celui care a trimis
let sendBy = document.createElement("span");
sendBy.innerText = "Buj";
mesageMeta.appendChild(sendBy);

//ora trimiterii
let hour = document.createElement("span");
hour.innerText = "12:00";
mesageMeta.appendChild(hour);

messageContainer.appendChild(mesageMeta);
//mesajul primit
let message = document.createElement("p");
message.innerText = "Hello from the other side :D";
messageContainer.appendChild(message);

messageDisplayer.appendChild(messageContainer);

messageDisplayer.appendChild(messageContainer);
