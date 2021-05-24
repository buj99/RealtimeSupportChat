import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
            super(params);
            this.setTitle("User meniu ");
            this.loginCredentials = JSON.parse(
                window.localStorage.getItem("credentials")
            );
            window.localStorage.removeItem("credentials");
            this.searchWidget;
            this.conversationList;
            this.isConversationListModified;
            this.chatTitleElemen;
            // this.conversations = [];
        }
        //event listeners
    searchEventListener(e) {
            if (this.searchWidget.value != "") {
                this.isConversationListModified = true;
                this.conversationList.innerHTML = "";
                this.conversations.map((conversation) => {
                    if (conversation.user.includes(this.searchWidget.value)) {
                        this.createUser(conversation);
                    }
                });
            } else {
                if (this.isConversationListModified) {
                    this.createUsers();
                }
            }
        }
        //load dom
    loadSetupDomElements() {
        this.chatTitleElemen = document.getElementById("chat-title");
        this.searchWidget = document.querySelector(".search-widget");
        this.conversationList = document.querySelector(".conversation-list");
        document.querySelector(".search-widget").addEventListener("input", (e) => {
            this.searchEventListener(e);
        });
        window.addEventListener('message', event => this.populatePage(event.data))

        document.querySelector(".chat-form img").addEventListener('click', () => this.sendMessage(document.querySelector(".chat-form input").value))

    }

    populatePage(message) {
        console.log(message.auth_token)
        fetch("http://localhost:3000/conversation/list", {
                method: "GET",
                headers: {
                    "auth_token": message.auth_token
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.createUsers(data)
            })


        this.createMesages(message.message)
    }

    sendMessage(message) {
        var authChat = window.sessionStorage.getItem('auth_chat')
        if (authChat != null) {
            // console.log(authChat) //debug
            // console.log(message) //debug
            fetch("http://localhost:3000/conversation", {
                    method: "POST",
                    headers: { "auth_chat": authChat },
                    body: JSON.stringify({ message: message }),
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    fetch("http://localhost:3000/conversation", {
                            method: "GET",
                            headers: { "auth_chat": authChat },
                        })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data2) => {
                            this.createMesages(data2)
                        })
                })
        } else {
            console.log('please, wait a moment!') //debug
        }

    }

    createMesages(messages) {
        const chatMesagesList = document.querySelector(".chat-message-list");
        chatMesagesList.innerHTML = "";
        messages
            .slice(0)
            .reverse()
            .map((msg) => {
                const dot = document.createElement("span");
                const messageRow = document.createElement("div");
                const messageText = document.createElement("div");
                const messageDate = document.createElement("div");
                dot.classList.add("dot");
                messageRow.classList.add("message-row");
                messageDate.innerText = msg.date;
                messageText.innerText = msg.message;
                if (msg.isAdmin == true) {
                    messageRow.classList.add("other-message-row");
                    messageText.classList.add("other-message-text");
                } else {
                    messageRow.classList.add("your-message-row");
                    messageText.classList.add("your-message-text");
                }
                messageRow.appendChild(messageText);
                messageRow.appendChild(dot);
                messageRow.appendChild(messageDate);
                chatMesagesList.appendChild(messageRow);
            });
    }
    createUser(conversation) {
        const divConversation = document.createElement("div");
        divConversation.classList.add("conversation");
        const img = document.createElement("img");
        img.src = "./static/Images/user.svg";
        img.alt = "imagine";
        divConversation.appendChild(img);
        const divClientName = document.createElement("div");
        divClientName.classList.add("client-name");
        divClientName.innerText = conversation.token.slice(-10);
        divConversation.appendChild(divClientName);
        const divLastMessage = document.createElement("div");
        divLastMessage.innerText =
            conversation.lastMsg.message;
        divLastMessage.classList.add("last-message");
        divConversation.addEventListener("click", () => {
            // functionality for displaying the proper conversation should be implemented here
            this.chatTitleElemen.innerText = divClientName.innerText;
            // this.createMesages(conversation.messages);                   this has to be modified
        });
        divConversation.appendChild(divLastMessage);
        document.querySelector(".conversation-list").appendChild(divConversation);
    }
    createUsers(conversations) {
        this.conversationList.innerHTML = "";
        conversations
            .slice(0)
            .reverse()
            .map((conversation) => {
                this.createUser(conversation);
            });
        this.isConversationListModified = false;
    }


    async getHTML() {
        return `<div class="user-meniu">
              <div class="chat-container">
        <div class="search-container">
            <input class="search-widget" type="text" placeholder=" Search" />
        </div>
        <div class="conversation-list">          
        </div>
        <div class="chat-title">
            <div class="menuBtn">
                <img src="./static/Images/BackButton.png" alt="Back Button">
            </div>
            <span id="chat-title">
            </span>
            <div class="three-dots-button">
            </div>
        </div>
        <div class="chat-message-list">
          
        </div>
        <div class="chat-form">

            <input type="text" placeholder="Type here!" />
            <img src="./static/Images/SendIcon.png" alt="Send Message" />
        </div>
    </div>
    <nav>
        <a href="https://www.javascript.com/"> Download Script </a>
        <a href="https://www.javascript.com/"> Logout </a>
        <a href="https://www.javascript.com/"> All Conversations </a>
    </nav>
    </div>
    `;
    }
}