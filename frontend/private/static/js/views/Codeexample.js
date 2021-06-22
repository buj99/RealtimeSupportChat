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
    <div class="download-block">
    <h2>Download your html and add it to your html file:</h2>
    <a download href="/putinhtml.txt" data-link><input class="download-btn" type="button" name="" value="Click here"> </a>   
    </div>

    <div class="download-block">
    <h2>Download your css and add it to your css file:</h2>  
    <a download href="/putincss.txt" data-link><input class="download-btn" type="button" name="" value="Click here"> </a>   
    </div>

    <div class="download-block">
    <h2>Download your js, and name it "chat.js":</h2>
    <a download href="/putinjs.txt" data-link><input class="download-btn" type="button" name="" value="Click here"> </a>   
    </div>

    <button class="back-btn" onclick="history.back()" >Back</button>
    </div>
    `;
    }
}