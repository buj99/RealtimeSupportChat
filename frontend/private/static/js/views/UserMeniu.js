import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("User meniu ");
    console.log(this.params);
    this.loginCredentials = JSON.parse(
      window.localStorage.getItem("credentials")
    );
    this.searchWidget;
    this.conversationList;
    this.isConversationListModified;

    //mocking
    this.conversations = [
      {
        user: "Claudiu",
        messages: [
          { isSentByAdmin: true, message: "Salut!", date: "28.03" },
          { isSentByAdmin: false, message: "Salut!", date: "28.03" },
          { isSentByAdmin: false, message: "gierbnk!", date: "28.03" },
        ],
      },
      {
        user: "User2",
        messages: [
          { isSentByAdmin: true, message: "Salut user2!", date: "28.03" },
          { isSentByAdmin: false, message: "Salut!", date: "28.03" },
          { isSentByAdmin: false, message: "sunt user 2!", date: "28.03" },
        ],
      },
    ];
    this.messages = [
      { isSentByAdmin: true, message: "Salut!", date: "28.03" },
      { isSentByAdmin: false, message: "Salut!", date: "28.03" },
      { isSentByAdmin: false, message: "gierbnk!", date: "28.03" },
    ];
  }
  //event listeners
  #searchEventListener(e) {
    console.log(this.searchWidget.value);
    if (this.searchWidget.value != "") {
      this.isConversationListModified = true;
      this.conversationList.innerHTML = "";
      this.conversations.map((conversation) => {
        if (conversation.user.includes(this.searchWidget.value)) {
          this.#createUser(conversation);
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
    this.searchWidget = document.querySelector(".search-widget");
    this.conversationList = document.querySelector(".conversation-list");
    this.createUsers();
    document.querySelector(".search-widget").addEventListener("input", (e) => {
      this.#searchEventListener(e);
    });
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
        if (msg.isSentByAdmin == true) {
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
  #createUser(conversation) {
    const divConversation = document.createElement("div");
    divConversation.classList.add("conversation");
    const img = document.createElement("img");
    img.src = "./static/Images/user.svg";
    img.alt = "imagine";
    divConversation.appendChild(img);
    const divClientName = document.createElement("div");
    divClientName.classList.add("client-name");
    divClientName.innerText = conversation.user;
    divConversation.appendChild(divClientName);
    const divLastMessage = document.createElement("div");
    divLastMessage.innerText =
      conversation.messages[conversation.messages.length - 1].message;
    divLastMessage.classList.add("last-message");
    divConversation.addEventListener("click", () => {
      this.createMesages(conversation.messages);
    });
    divConversation.appendChild(divLastMessage);
    document.querySelector(".conversation-list").appendChild(divConversation);
  }
  createUsers() {
    this.conversationList.innerHTML = "";
    this.conversations
      .slice(0)
      .reverse()
      .map((conversation) => {
        this.#createUser(conversation);
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
            <span>
                ${this.params.username} 
            </span>
            <div class="three-dots-button">
                <div class="three-dots-button__dot"></div>
                <div class="three-dots-button__dot"></div>
                <div class="three-dots-button__dot"></div>
            </div>
        </div>
        <div class="chat-message-list">
          
        </div>
        <div class="chat-form">

            <input type="text" placeholder="Type here!">
            <img src="" alt="Send Message" />
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
