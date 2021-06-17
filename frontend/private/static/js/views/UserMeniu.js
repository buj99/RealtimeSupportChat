import AbstractView from "./AbstractView.js";
import { formatDateForChat, navigateTo } from "../utils.js";
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
            this.currentAuthChat;
            this.authToken;
            this.conversations;
            // this.populatePage()
        }
        //load dom
        //   loadSetupDomElements() {
        //     const goCostumizationBtn = document.getElementById("costumize-btn");
        //     goCostumizationBtn.addEventListener("click", () => {
        //       navigateTo(window.location.href + "/costumize");
        //     });
        //     this.chatTitleElemen = document.getElementById("chat-title");
        //     this.searchWidget = document.querySelector(".search-widget");
        //     this.conversationList = document.querySelector(".conversation-list");
        //     document.querySelector(".search-widget").addEventListener("input", (e) => {
        //       this.searchEventListener(e);
        //     });
        //     window.addEventListener("message", (event) => this.populatePage());
        // }

    //load dom
    loadSetupDomElements() {
        new EmojiPicker();
        const goCostumizationBtn = document.getElementById("costumize-btn");
        goCostumizationBtn.addEventListener("click", () => {
            navigateTo(window.location.href + "/costumize");
        });

        const goCodeExBtn=document.getElementById("codeex-btn");
        goCodeExBtn.addEventListener("click",()=>{
            navigateTo(window.location.href+"/codeexample");
        } );

        this.chatTitleElemen = document.getElementById("chat-title");
        this.searchWidget = document.querySelector(".search-widget");
        this.conversationList = document.querySelector(".conversation-list");
        document.querySelector(".search-widget").addEventListener("input", (e) => {
            this.searchEventListener(e);
        });
        window.addEventListener("message", (event) => this.populatePage());
        document
            .querySelector(".chat-form img")
            .addEventListener("click", () =>
                this.sendMessage(document.querySelector(".chat-form input").value)
            );



        const threeDotsButton = document.querySelector(".three-dots-button");

        const nav = document.getElementsByTagName("nav")[0];

        threeDotsButton.addEventListener("click", (e) => {
            nav.classList.add("is--open");
        });

        document.body.addEventListener("click", (e) => {
            console.log(e);
            if (threeDotsButton.contains(e.target) || nav.contains(e.target)) {
                return;
            }

            nav.classList.remove("is--open");
        });

        let intervalId = setInterval(() => {
            this.populatePage();
        }, 500);
        window.sessionStorage.setItem("intervalId", intervalId);

        window.addEventListener(
            "popstate",
            function(event) {
                clearInterval(window.sessionStorage.getItem("intervalId"));
            },
            false
        );




    }



    populatePage() {
        let admin = window.localStorage.getItem("admin");
        this.authToken = window.localStorage.getItem("auth_token_" + admin);
        if (this.authToken) {
            fetch("http://localhost:3000/conversations/" + admin, {
                    method: "GET",
                    headers: {
                        auth_token: this.authToken,
                    },
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.conversationsList = data; // might be in createConversations ?

                    this.createConversations(data);
                });
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

    sendMessage(message) {
        if (this.currentAuthChat == undefined) {
            window.alert("Select a chat first!");
        } else {
            let admin = window.localStorage.getItem("admin");
            fetch("http://localhost:3000/conversations/" + admin + "/client", {
                    method: "POST",
                    headers: {
                        auth_chat: this.currentAuthChat,
                        auth_token: this.authToken,
                    },
                    body: JSON.stringify({ message: message }),
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    fetch("http://localhost:3000/conversations/" + admin + "/client", {
                            method: "GET",
                            headers: { auth_chat: this.currentAuthChat },
                        })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data2) => {
                            this.createMesages(data2);
                        });
                });

            //update the last message sent in the conversationList
            let shortCurrentAuthToken = this.currentAuthChat.slice(-10);
            let sentMessage = document.querySelector(".chat-form input").value;
            Array.from(document.getElementsByClassName("conversation")).forEach(
                (element) => {
                    let shortAuthToken =
                        element.getElementsByClassName("client-name")[0].innerHTML;
                    if (shortAuthToken == shortCurrentAuthToken) {
                        //this is the conversation that has to be updated
                        element.getElementsByClassName("last-message")[0].innerHTML =
                            sentMessage;
                    }
                }
            );
            //clear the input
            document.querySelector(".chat-form input").value = "";
        }
    }

    createConversations(conversations) {
        let filteredConversations = conversations
            .filter(function(e) {
                return e.lastMsg != undefined;
            })
            .filter((e) => {
                let searchedValue = this.searchWidget.value;
                if (searchedValue == "") {
                    return true;
                } else {
                    if (e.name == undefined) {
                        return "undefined"
                            .toLowerCase()
                            .includes(searchedValue.toLowerCase());
                    }
                    return e.name.toLowerCase().includes(searchedValue.toLowerCase());
                }
            });

        let sortedConversations = filteredConversations.sort(
            (a, b) => -parseInt(a.lastMsg.date) - parseInt(b.lastMsg.date)
        );
        //check if there is something different
        let isThereANewMessage = false;
        if (this.conversations == undefined) {
            isThereANewMessage = true;
        } else {
            sortedConversations.forEach((conversation, index) => {
                if (this.conversations[index] == undefined && conversation.lastMsg.date != undefined ||
                    this.conversations[index].lastMsg.date != conversation.lastMsg.date) {
                    isThereANewMessage = true;
                }
            });
        }
        if (isThereANewMessage) {
            this.conversationList.innerHTML = "";
            sortedConversations.forEach((conversation, index) => {
                this.createConversation(conversation);
            });
            this.conversations = sortedConversations;
        }
        this.isConversationListModified = false;
    }

    createConversation(conversation) {
        const divConversation = document.createElement("div");
        divConversation.classList.add("conversation");
        divConversation.id = conversation.auth_chat;
        const img = document.createElement("img");
        img.src = conversation.photo_link;
        img.onerror = function() {
            img.src = "./static/Images/user.svg";
        };
        img.alt = "imagine";
        divConversation.appendChild(img);
        const divClientName = document.createElement("div");
        divClientName.classList.add("client-name");

        let clientName = conversation.name;
        if (clientName == undefined) clientName = "undefined"; //this might be removed as we won't allow costumers to send messages without giving a name
        divClientName.innerText = clientName;

        divConversation.appendChild(divClientName);
        const divLastMessage = document.createElement("div");
        if (
            conversation.lastMsg != undefined &&
            conversation.lastMsg.message != undefined
        ) {
            let sentBy = conversation.name + " : ";
            if (conversation.lastMsg.isAdmin) {
                let sentBy = "You : ";
            }
            divLastMessage.innerText = sentBy + conversation.lastMsg.message;
        }
        divLastMessage.classList.add("last-message");

        divConversation.addEventListener("click", (event) => {
            let clientName = divClientName.innerText;
            this.chatTitleElemen.innerText = clientName;
            this.currentAuthChat = divConversation.id;

            let admin = window.localStorage.getItem("admin");
            fetch("http://localhost:3000/conversations/" + admin + "/" + clientName, {
                    method: "GET",
                    headers: { auth_chat: this.currentAuthChat },
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // console.log(data) //debug
                    this.createMesages(data);
                });
        });

        divConversation.appendChild(divLastMessage);
        document.querySelector(".conversation-list").appendChild(divConversation);
    }

    removeElementsByClassName(className) {
        console.log("remove called");
        Array.from(document.getElementsByClassName(className)).forEach(
            (message) => {
                message.remove();
            }
        );
    }

    async getHTML() {
        return `<div class="user-meniu">
              <div class="chat-container">
        <div class="search-container">
            <img src="./static/Images/user.png" alt="profile picture" class="profile-picture">
            <input class="search-widget" type="text" placeholder=" Search" />
        </div>
        <div class="conversation-list">          
        </div>
        <div class="chat-title">
            <div class="menuBtn" id="menuBtn">
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
            <input data-emoji-picker="true" type="text" placeholder="Type here!"/>
            <img src="./static/Images/SendIcon.png" alt="Send Message" />
        </div>
    </div>
    <nav class>
        <a href="/login" data-link>
            <input class="nav-button" type="button" name="" value="Logout">
         </a>   
            <input id="codeex-btn" class="nav-button" type="button" name="" value="Code example">
            <input id="costumize-btn"class="nav-button" type="button" name="" value="Customize">
        
        </nav>
    `;
    }
}