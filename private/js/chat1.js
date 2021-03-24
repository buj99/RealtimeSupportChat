const mesaje = [
  {
    autor: "moderator",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium cumque aliquid sequi ipsa veniam quis, impedit quaerat fugiat nihil modi." ,
    time: "12:00",
    photo: "../public/images/buj.jpg",
    isModerator: "true",
  },
  {
    autor: "user",
    text: "hello from the othe side",
    time: "12:01",
    photo: "../public/images/user.svg",
    isModerator: "false",
  },
  {
    autor: "moderator",
    text: "Hello again",
    time: "12:02",
    photo: "../public/images/buj.jpg",
    isModerator: "true",
  },
];
//body element
let body = document.getElementsByTagName("body")[0];
//chat container
const chatContainer = document.createElement("div");
chatContainer.id = "chat-container";
body.appendChild(chatContainer);

//chat header
const chatHeader = document.createElement("header");
chatHeader.id = "chat-header";
chatContainer.appendChild(chatHeader);
//titlu suport chat
const title = document.createElement("p");
title.id = "chat-title";
title.innerText = "Suport chat";
chatHeader.appendChild(title);

//buton minimizare
const minimizeBtn = document.createElement("button");
minimizeBtn.id = "minimize-btn";
minimizeBtn.innerText = "X";
chatHeader.appendChild(minimizeBtn);

//buton maximizare
const maximizeBtn = document.createElement("button");
maximizeBtn.id = "maximize-btn";
maximizeBtn.classList.toggle("hiden"); // trebuie schimbat invers 
maximizeBtn.innerHTML = "+";
chatHeader.appendChild(maximizeBtn);

//messages container
const messagesContainer = document.createElement("div");
messagesContainer.id = "messages-container";
chatContainer.appendChild(messagesContainer);

//creare mesaje
mesaje.map((mesaj) => {
  //message container
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");
  messageContainer.classList.add(`${mesaj.autor}`);

  //message meta
  const messageMeta = document.createElement("div");
  messageMeta.classList.add("message-meta");
  messageContainer.appendChild(messageMeta);

  //poza suport
  const messageImage = document.createElement("img");
  messageImage.classList.add("message-image");
  messageImage.src = mesaj.photo;
  messageMeta.appendChild(messageImage);

  //message author
  const messageAuthor = document.createElement("span");
  messageAuthor.classList.add("message-author");
  messageAuthor.innerText = mesaj.autor;
  messageMeta.appendChild(messageAuthor);

  //ora trimitere mesaj
  const messageHour = document.createElement("span");
  messageHour.classList.add("message-hour");
  messageHour.innerText = mesaj.time;
  messageMeta.appendChild(messageHour);

  //mesaj text
  const messageText = document.createElement("p");
  messageText.classList.add("message-text");
  messageText.innerText = mesaj.text;
  messageContainer.appendChild(messageText);
  messagesContainer.appendChild(messageContainer);
});

//input container
const inputContainer = document.createElement("div");
inputContainer.id = "input-container";
chatContainer.appendChild(inputContainer);

//textarea  in care se introduce mesajul
const textInput = document.createElement("textarea");
textInput.id = "text-input";
inputContainer.appendChild(textInput);

//buton trimitere
const sendBtn = document.createElement("button");
sendBtn.id = "send-btn";
sendBtn.innerText = ">";
inputContainer.appendChild(sendBtn);
