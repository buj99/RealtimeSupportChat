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
    <div><p>
        insert code here
    </p></div>
    <h2>To your css:</h2>
    <div><p>
        insert code here
    </p></div>
    <h2>To your js:</h2>
    <div><p>
        insert code here
    </p></div>
    <button class="back-btn" onclick="history.back()" >Back</button>
    </div>
    `;
    }
}