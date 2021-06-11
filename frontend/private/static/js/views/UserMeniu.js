import AbstractView from "./AbstractView.js";
import { formatDateForChat } from "../utils.js";
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
            //map to store conversationTokens mapped to their shortcuts
            this.conversationTokens = new Map();
            this.currentAuthChat;
            this.authToken;
        }
        //event listeners
    searchEventListener(e) {
            // if (this.searchWidget.value != "") {
            this.isConversationListModified = true;
            this.conversationList.innerHTML = "";
            let searchedValue = this.searchWidget.value;
            if (searchedValue == "") {
                //the searched value is the empty string, so we display all conversations
                // console.log(this.conversationsList); //debug
                this.createUsers(this.conversationsList);
            } else {
                this.conversationsList.map((conversation) => {
                    let shortAuthToken = conversation.token.slice(-10);
                    // console.log(shortAuthToken) //debug
                    if (shortAuthToken.includes(searchedValue)) {
                        // console.log(conversation)
                        this.createUser(conversation);
                    }
                });
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
        window.addEventListener('message', event => this.populatePage(event.data.auth_token))

        document.querySelector(".chat-form img").addEventListener('click', () => this.sendMessage(document.querySelector(".chat-form input").value))

        const threeDotsButton = document.querySelector(".three-dots-button");
        // let menuBtn = document.querySelector(".menuBtn");
        const nav = document.getElementsByTagName("nav")[0];

        threeDotsButton.addEventListener('click', (e) => { nav.classList.add('is--open'); });
        // menuBtn.addEventListener('click', onClick);
        document.body.addEventListener('click', (e) => {
            console.log(e);
            if (
                threeDotsButton.contains(e.target) ||
                nav.contains(e.target)
            ) {
                return;
            }

            nav.classList.remove('is--open');
        });




        setInterval(() => {
            //update the current message
            let token = window.sessionStorage.getItem('conversationToken');
            // console.log('token' + token) //debug
            if (token != null) {
                fetch("http://localhost:3000/conversation", {
                        method: "GET",
                        headers: { "auth_chat": token },
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data2) => {
                        this.createMesages(data2)
                    })
                    // updateConversations
                    // this.populatePage(window.localStorage.getItem("auth_token"))
            }

            console.log('authToken' + this.authToken)
                // this.populatePagepage(this.authToken)

        }, 1000)
    }
    populatePage(auth_token) {
        this.authToken = window.localStorage.getItem('auth_token');
        console.log(window.localStorage.getItem("auth_token"))
        console.log('in populate message ' + this.authToken) //debug
        fetch("http://localhost:3000/conversation/list", {
                method: "GET",
                headers: {
                    "auth_token": this.authToken
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.conversationsList = data;
                this.createUsers(data)
            })
    }

    sendMessage(message) {
        if (this.currentAuthChat == undefined) {
            console.log('currentAuthChat is undefined')
        } else {
            fetch("http://localhost:3000/conversation", {
                    method: "POST",
                    headers: {
                        "auth_chat": this.currentAuthChat,
                        "auth_token": this.authToken
                    },
                    body: JSON.stringify({ message: message })
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    fetch("http://localhost:3000/conversation", {
                            method: "GET",
                            headers: { "auth_chat": this.currentAuthChat },
                        })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data2) => {
                            this.createMesages(data2)
                        })
                })

            //update the last message sent in the conversationList
            let shortCurrentAuthToken = this.currentAuthChat.slice(-10);
            let sentMessage = document.querySelector(".chat-form input").value;
            Array.from(document.getElementsByClassName("conversation")).forEach(element => {
                let shortAuthToken = element.getElementsByClassName("client-name")[0].innerHTML
                if (shortAuthToken == shortCurrentAuthToken) {
                    //this is the conversation that has to be updated
                    element.getElementsByClassName("last-message")[0].innerHTML = sentMessage
                }
            });
            //clear the input
            document.querySelector(".chat-form input").value = "";

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
                messageDate.innerText = formatDateForChat(msg.date);
                messageText.innerText = msg.message;
                if (msg.isAdmin == true) {
                    messageRow.classList.add("your-message-row");
                    messageText.classList.add("your-message-text");
                    messageRow.appendChild(messageDate);
                    messageRow.appendChild(dot);
                    messageRow.appendChild(messageText);
                } else {
                    messageRow.classList.add("other-message-row");
                    messageText.classList.add("other-message-text");
                    messageRow.appendChild(messageText);
                    messageRow.appendChild(dot);
                    messageRow.appendChild(messageDate);
                }
                chatMesagesList.appendChild(messageRow);
            });
    }

    createUser(conversation) { //todo change in createConversation
        const divConversation = document.createElement("div");
        divConversation.classList.add("conversation");
        const img = document.createElement("img");
        img.src = "./static/Images/user.svg";
        img.alt = "imagine";
        divConversation.appendChild(img);
        const divClientName = document.createElement("div");
        divClientName.classList.add("client-name");
        let shortToken = conversation.token.slice(-10);
        divClientName.innerText = shortToken;
        this.conversationTokens.set(shortToken, conversation.token);
        divConversation.appendChild(divClientName);
        const divLastMessage = document.createElement("div");
        if (conversation.lastMsg != undefined && conversation.lastMsg.message != undefined) {
            divLastMessage.innerText = conversation.lastMsg.message;
        }
        divLastMessage.classList.add("last-message");
        divConversation.addEventListener("click", () => {
            // functionality for displaying the proper conversation should be implemented here
            this.chatTitleElemen.innerText = divClientName.innerText;
            this.currentAuthChat = this.conversationTokens.get(divClientName.innerText);
            window.sessionStorage.setItem('conversationToken', this.currentAuthChat);
            fetch("http://localhost:3000/conversation", {
                    method: "GET",
                    headers: { "auth_chat": this.currentAuthChat },
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.createMesages(data);
                })
        });
        divConversation.appendChild(divLastMessage);
        document.querySelector(".conversation-list").appendChild(divConversation);
    }
    createUsers(conversations) { //change  to create conversations
        this.conversationList.innerHTML = "";
        conversations.forEach(conversation => {
            if (conversation.lastMsg != undefined)
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
    <nav class>
        <a href="/login" data-link>
            <input class="nav-button" type="button" name="" value="Logout">
         </a> 
         <a href="https://www.oracle.com/ro/java/technologies/javase-downloads.html" data-link>
            <input class="nav-button" type="button" name="" value="Download">
         </a> 
         <a href="/${this.authToken}/costumize"  data-link>
            <input class="nav-button" type="button" name="" value="Customize">
         </a> 
        
        </nav>
    `;
    }
}