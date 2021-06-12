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
            this.populatePage()
        }
        //event listeners
    searchEventListener(e) {
            this.isConversationListModified = true;
            this.conversationList.innerHTML = "";
            let searchedValue = this.searchWidget.value;
            if (searchedValue == "") {
                //the searched value is the empty string, so we display all conversations
                // console.log(this.conversationsList); //debug
                this.createConversations(this.conversationsList);
            } else {
                this.conversationsList.map((conversation) => {
                    let shortAuthToken = conversation.token.slice(-10);
                    // console.log(shortAuthToken) //debug
                    if (shortAuthToken.includes(searchedValue)) {
                        // console.log(conversation)
                        this.createConversation(conversation);
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
        window.addEventListener('message', event => this.populatePage())

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
            // let token = window.sessionStorage.getItem('conversationToken');
            // console.log('token' + token) //debug
            if (false) { //token != null) {
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

            // console.log('authToken' + this.authToken)
            this.populatePage()

        }, 1000)
    }

    populatePage() {
        let admin = window.localStorage.getItem("admin");
        this.authToken = window.localStorage.getItem("auth_token_" + admin);
        if (this.authToken) {
            fetch("http://localhost:3000/conversations/" + admin, {
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
                    this.createConversations(data)
                })
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

    updateMessages(data) {

    }


    createConversations(conversations) {
        this.conversationList.innerHTML = "";
        let filteredConversations = conversations.filter(function(e) {
            return e.lastMsg != undefined;
        })
        let sortedConversations = filteredConversations.sort(
            (a, b) => -parseInt(a.lastMsg.date) - parseInt(b.lastMsg.date));

        sortedConversations.forEach(conversation => {
            if (conversation.lastMsg != undefined)
                this.createConversation(conversation);
        });
        this.isConversationListModified = false;
    }

    createConversation(conversation) {
        const divConversation = document.createElement("div");
        divConversation.classList.add("conversation");
        const img = document.createElement("img");
        if (conversation.name != undefined) {
            img.src = conversation.photo_link;
        } else {
            img.src = "./static/Images/user.svg";
        }
        img.alt = "imagine";
        divConversation.appendChild(img);
        const divClientName = document.createElement("div");
        divClientName.classList.add("client-name");

        let shortToken = conversation.auth_chat.slice(-10);
        divClientName.innerText = conversation.name;

        this.conversationTokens.set(shortToken, conversation.token);

        divConversation.appendChild(divClientName);
        const divLastMessage = document.createElement("div");
        if (conversation.lastMsg != undefined && conversation.lastMsg.message != undefined) {
            let sentBy = 'Him/Her : '
            if (conversation.lastMsg.isAdmin) {
                let sentBy = 'You : '
            }
            divLastMessage.innerText = sentBy + conversation.lastMsg.message;
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