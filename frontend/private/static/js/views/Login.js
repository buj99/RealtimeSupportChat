import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.credentials;
        this.setTitle("Login");
    }
    loadSetupDomElements() {
        const loginForm = document.getElementById("loginForm");
        const email = document.getElementById("email-input");
        const pass = document.getElementById("password-input");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.credentials = {
                email: email.value,
                pass: pass.value
            }
            console.log(this.credentials);
        });
    }
    getCredentials() {
        return this.credentials;
    }
    async getHTML() {
        return `<div class="login-box">
        <section class="image-container">
        <img src="./static/Images/background.jpg"/> 

    </section>

    <section class="login-container">
        <header>
            <h1 class="welcome-txt">
                We can help you communicate with clients fast and efficient.
                Real Time Support Chat waits for you. Connect with us! 
            </h1>
        </header>
       
        <form id="loginForm">
            <label class="label" for="email-input">
                <input class="input" type="email" placeholder="Email" id="email-input" required>
            </label>
            <label class="label" for="password-input">
                <input class="input" type="password" placeholder="Password" id="password-input" required>
            </label>
            <button class="login-button" type="submit">
                Login
            </button>
        </form>
        <footer>
        <div class="register-box">
            <p class="reg">You don't have an account? </p>
            <input class="btn2" type="button" name="" value="Register here">  
        </div> 
    </footer>
    </section>
    </div>`;
    }
}