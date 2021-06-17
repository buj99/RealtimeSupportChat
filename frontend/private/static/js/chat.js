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

var adminName = "";
// const adminPhotoLink = "https://pbs.twimg.com/profile_images/1407346896/89.jpg"
const uniqueAdminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzODVlMjk1ZmQwZmMwMjVkZDQwMjIiLCJpYXQiOjE2MjM0MjY1MzB9.JjTxGGQ_NobydTv6Nwm1oRrs0mRl9k6BvEm4OxpWEu0";
var lastMessageDate;
var configuration;

let authChat = window.localStorage.getItem(uniqueAdminToken + "_auth_chat");
let clientName = window.localStorage.getItem(uniqueAdminToken + "_name");
let clientPhotoLink = window.localStorage.getItem(uniqueAdminToken + "_photo_link");

await fetch("http://localhost:3000/admins/customizations/" + clientName, {
        method: "GET",
        headers: { auth_unique_admin_token: uniqueAdminToken }
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        configuration = data;
        adminName = configuration.adminName;
    })
console.log(adminName);
if (authChat != null) {
    fetch("http://localhost:3000/conversations/" + adminName + "/" + clientName, {
            method: "GET",
            headers: { auth_chat: authChat }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.length > 0) {
                populateWithMessages(data);
                // lastMessageDate = data[data.length - 1].date;
            }
        });
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
    scrollToBottom()
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
if (window.localStorage.getItem(uniqueAdminToken + "_name") == null) {
    textInput.placeholder = "Type your name here!";
} else if (window.localStorage.getItem(uniqueAdminToken + "_auth_chat") == null) {
    textInput.placeholder = "Type your photo url here!";
} else {
    textInput.placeholder = "Type here!";
}
inputContainer.appendChild(textInput);

//buton trimitere
const sendBtn = document.createElement("button");
sendBtn.id = "send-btn";
sendBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
inputContainer.appendChild(sendBtn);
sendBtn.onclick = () => {
    let sentText = document.querySelector("textarea").value;

    if (window.localStorage.getItem(uniqueAdminToken + "_name") == null) {
        //the user typed his/her name
        if (isInCorrectNameFormat(sentText)) {
            window.localStorage.setItem(uniqueAdminToken + "_name", sentText.split(' ').join(''))
            textInput.placeholder = "Type your photo url here!";
            document.querySelector("textarea").value = "";
        }
    } else if (window.localStorage.getItem(uniqueAdminToken + "_auth_chat") == null) {
        window.localStorage.setItem(uniqueAdminToken + "_photo_link", sentText)
        clientPhotoLink = sentText;
        //the user typed image url, so now we have all the necessary data to create the chat
        let name = window.localStorage.getItem(uniqueAdminToken + "_name");
        let photoLink = sentText;
        fetch("http://localhost:3000/conversations/" + clientName, {
                method: "POST",
                headers: {
                    auth_unique_admin_token: uniqueAdminToken
                },
                body: JSON.stringify({
                    "name": name,
                    "photo_link": photoLink
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                window.localStorage.setItem(uniqueAdminToken + "_auth_chat", data.auth_chat)
                authChat = data.auth_chat;
                textInput.placeholder = "Type here!";
                // console.log("success!") //debug
            })

        document.querySelector("textarea").value = "";
    } else {
        //we have a message to send

        let authChat = window.localStorage.getItem(uniqueAdminToken + "_auth_chat");
        // console.log(conversationToken) //debug

        fetch("http://localhost:3000/conversations/" + adminName + "/" + clientName, {
                method: "POST",
                headers: { auth_chat: authChat },
                body: JSON.stringify({ message: sentText }),
            })
            .then((res) => {
                return res.json();
            })
            .then((data2) => {
                // console.log(data2) //debug
                fetch("http://localhost:3000/conversations/" + adminName + "/" + clientName, {
                        method: "GET",
                        headers: { auth_chat: authChat },
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data3) => {
                        // document.querySelector("textarea").value = "";
                        // console.log(data3) console.log
                        populateWithMessages(data3);
                    });
            });

        document.querySelector("textarea").value = "";
    }
};

const populateWithMessages = (messages) => {
    removeCurrentMessages()
    messages.forEach((message) => {
        //message container
        let author = "";
        let photoLink = "";
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message");
        if (message.isAdmin) {
            if (configuration != undefined) {
                author = configuration.adminName;
                photoLink = configuration.adminPhotoLink;
                messageContainer.style.background = configuration.backgroudTheme;
            } else {
                author = "moderator";
            }
            messageContainer.classList.add("moderator");
        } else {
            author = clientName;
            photoLink = clientPhotoLink;
            messageContainer.classList.add("user");
        }

        //message meta
        const messageMeta = document.createElement("div");
        messageMeta.classList.add("message-meta");
        messageContainer.appendChild(messageMeta);

        //poza suport
        const messageImage = document.createElement("img");
        messageImage.classList.add("message-image");
        messageImage.src = photoLink;
        messageImage.onerror = function() {
            messageImage.src = "./static/Images/user.svg";
        }
        messageMeta.appendChild(messageImage);

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
        if (message.isAdmin && configuration != undefined) {
            messageText.style.color = configuration.textColor;
            messageText.style.fontSize = "large";
        }
        messageContainer.appendChild(messageText);
        messagesContainer.appendChild(messageContainer);
    });
    lastMessageDate = messages[messages.length - 1].date;
};



const removeCurrentMessages = () => {
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
};

const scrollToBottom = () => {
        var myDiv = document.getElementById("messages-container");
        myDiv.scrollTop = myDiv.scrollHeight;
    }
    //theck if the name contains only letters and digits and is not empty
const isInCorrectNameFormat = (name) => {
    if (name != null && name != undefined) {
        for (let c of name) {
            if (c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
                continue;
            } else {
                alert('White characters are not allowed!')
                return false;
            }
        }
    }
    if (name == "") {
        alert('The textbox is empty!')
        return false;
    }
    return true;
}

setInterval(() => {
    //update messages

    let authChat = window.localStorage.getItem(uniqueAdminToken + "_auth_chat");

    if (authChat != null) {
        fetch("http://localhost:3000/conversations/" + adminName + "/" + clientName, {
                method: "GET",
                headers: { auth_chat: authChat },
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.length > 0 && data[data.length - 1].date != lastMessageDate) {
                    //we have a new message
                    populateWithMessages(data);
                    // lastMessageDate = data[data.length - 1].date;
                }
            });


    }
}, 1000);