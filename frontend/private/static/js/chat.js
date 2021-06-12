import { formatDateForChat } from "./chatUtils.js";

const css1 = document.createElement("link");
css1.rel = "stylesheet";
css1.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
css1.integrity =
  "sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==";
css1.crossOrigin = "anonymous";

const css2 = document.createElement("link");
css2.rel = "stylesheet";
css2.href = "http://localhost:8090/static/styles/chat.css";
document.head.appendChild(css1);
document.head.appendChild(css2);

if (false) {
  fetch(
    fetch("http://localhost:3000/asignchat", {
      method: "GET",
      headers: {
        auth_unique_admin_token: authToken,
      },
    })
    .then((res) => {
        return res.json();
    })
    .then((data3) => {
        populateWithMessages(data3);
    }));
}
//body element
let body = document.getElementsByTagName("body")[0];
//chat container
const chatContainer = document.createElement("div");
chatContainer.id = "chat-container";
chatContainer.classList.toggle("hiden");
body.appendChild(chatContainer);

//chat header
const chatHeader = document.createElement("header");
chatHeader.id = "chat-header";
chatContainer.appendChild(chatHeader);
// chatHeader.classList.toggle("hiden");
//titlu suport chat
const title = document.createElement("p");
title.id = "chat-title";
title.innerText = "Suport chat";
chatHeader.appendChild(title);

//buton minimizare
const minimizeBtn = document.createElement("button");
minimizeBtn.id = "minimize-btn";
minimizeBtn.innerHTML = '<i class="fas fa-times"></i>';
chatHeader.appendChild(minimizeBtn);
minimizeBtn.onclick = () => {
    chatContainer.classList.toggle("hiden");
    maximizeBtn.classList.toggle("hiden");
};

//buton maximizare
const maximizeBtn = document.createElement("button");
maximizeBtn.id = "maximize-btn";
maximizeBtn.innerHTML = '<i class="fas fa-plus"></i>';
maximizeBtn.onclick = () => {
    chatContainer.classList.toggle("hiden");
    maximizeBtn.classList.toggle("hiden");
};
body.appendChild(maximizeBtn);

//messages container
const messagesContainer = document.createElement("div");
messagesContainer.id = "messages-container";
chatContainer.appendChild(messagesContainer);

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
sendBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
inputContainer.appendChild(sendBtn);
sendBtn.onclick = () => {
    // console.log(document.querySelector("textarea").value) //debug
    let sendMessagee = document.querySelector("textarea").value;
    let conversationToken = window.localStorage.getItem("conversationToken");
    // console.log(conversationToken) //debug
    if (false)
        fetch("http://localhost:3000/conversation", {
            method: "POST",
            headers: { auth_chat: conversationToken },
            body: JSON.stringify({ message: sendMessagee }),
        })
        .then((res) => {
            return res.json();
        })
        .then((data2) => {
            console.log(data2);
            fetch("http://localhost:3000/conversation", {
                    method: "GET",
                    headers: { auth_chat: conversationToken },
                })
                .then((res) => {
                    return res.json();
                })
                .then((data3) => {
                    document.querySelector("textarea").value = "";
                    Array.from(document.getElementsByClassName("message user")).forEach(
                        (message) => {
                            message.remove();
                        }
                    );
                    Array.from(
                        document.getElementsByClassName("message moderator")
                    ).forEach((message) => {
                        message.remove();
                    });
                    populateWithMessages(data3);
                });
        });
};

const populateWithMessages = (messages) => {
    messages.forEach((message) => {
        //message container
        let author = "";
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message");
        if (message.isAdmin) {
            author = "moderator";
        } else {
            author = "user";
        }
        messageContainer.classList.add(author);

        //message meta
        const messageMeta = document.createElement("div");
        messageMeta.classList.add("message-meta");
        messageContainer.appendChild(messageMeta);

        //poza suport
        // const messageImage = document.createElement("img");
        // messageImage.classList.add("message-image");
        // messageImage.src = mesaj.photo;
        // messageMeta.appendChild(messageImage);

        //message author
        const messageAuthor = document.createElement("span");
        messageAuthor.classList.add("message-author");
        messageAuthor.innerText = author;
        messageMeta.appendChild(messageAuthor);

        //ora trimitere mesaj
        const messageHour = document.createElement("span");
        messageHour.classList.add("message-hour");
        messageHour.innerText = formatDateForChat(message.date);
        messageMeta.appendChild(messageHour);

        //mesaj text
        const messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.innerText = message.message;
        messageContainer.appendChild(messageText);
        messagesContainer.appendChild(messageContainer);
    });
    var myDiv = document.getElementById("messages-container");
    myDiv.scrollTop = myDiv.scrollHeight;
};

setInterval(() => {
    //update messages
    if (false) {
        fetch("http://localhost:3000/conversation", {
                method: "GET",
                headers: { auth_chat: window.localStorage.getItem("conversationToken") },
            })
            .then((res) => {
                return res.json();
            })
            .then((data3) => {
                populateWithMessages(data3);
            });
    }
}, 1000);