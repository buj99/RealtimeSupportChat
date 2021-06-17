import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
            super(params);
            this.setTitle("Codeexample");
            this.admin = window.localStorage.getItem("admin");
            this.uniqueAdminToken = window.localStorage.getItem("unique_admin_token_" + this.admin);
        }

async getHTML() {
    return `
    <div class="codeex-container">
    <h1>To get your own personalized chat for your website just add the next code.</h1>
    
    <h2>To your html:</h2>
    <div><p class="codeex-p">
        insert code here
    </p></div>

    <h2>To your css:</h2>
    <div><p class="codeex-p">
    .chat-container {
        display: grid;
        grid: "search-container chat-title" 2fr "conversation-list chat-message-list" 20fr "conversation-list chat-form" 3fr / 1fr 4fr;
        width: 98%;
        height: 95vh;
        background-color: #fff;
        border-radius: 10px;
      }      
@media all and (max-width: 520px) {
    .chat-container {
      width: 100%;
      height: 100%;
      border-radius: 0;
      display: grid;
      grid: "search-container chat-title" 2fr "conversation-list chat-message-list" 20fr "conversation-list chat-form" 3fr / 0px 4fr;
    }}
    </p></div>

    <h2>To your js:</h2>
    <div><p class="codeex-p">
        insert code here
    </p></div>
    <button class="back-btn" onclick="history.back()" >Back</button>
    </div>
    `;
    }
}