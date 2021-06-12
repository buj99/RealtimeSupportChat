import AbstractView from "./AbstractView.js";
import { navigateTo } from "../utils.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.credentials;
        this.setTitle("Login");
    }
    loadSetupDomElements() {
        const loginForm = document.getElementById("loginForm");
        const username = document.getElementById("username-input");
        const pass = document.getElementById("password-input");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.credentials = {
                username: username.value,
                password: pass.value,
            };

            this.isLoginValid = true;
            fetch("http://localhost:3000/admins/" + this.credentials.username, {
                    method: "POST",
                    body: JSON.stringify(this.credentials),
                    headers: { "Content-Type": "Application/json" },
                })
                .then((res) => {
                    if (res.status != 200) {
                        this.isLoginValid = false;
                        window.alert('Incorrect credentials!')
                    }
                    return res.json();
                })
                .then((data) => {
                    if (this.isLoginValid) {
                        window.postMessage({})
                            //auth_token for this admin
                        window.localStorage.setItem("auth_token_" + this.credentials.username, data.auth_token)
                        window.localStorage.setItem("admin", this.credentials.username);
                        fetch("http://localhost:3000/admins/" + this.credentials.username + "/chatkey", {
                                method: "GET",
                                headers: { "auth_token": data.auth_token }
                            })
                            .then((res) => {
                                return res.json();
                            })
                            .then((data2) => {
                                window.localStorage.setItem("unique_admin_token_" + this.credentials.username, data2.unique_admin_token) //to be used in the script
                            })
                            //change view
                        navigateTo(window.location.href + this.credentials.username);

                    }
                });
        });

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
            <label class="label" for="username-input">
                <input class="input" type="text" placeholder="Username" id="username-input" required>
            </label>
            <label class="label" for="password-input">
                <input class="input" type="password" placeholder="Password" id="password-input" required>
            </label>
            <button class="login-button" type="submit">
                Login
            </button>
        </form>
        <footer>
        <div class="register-box-button">
            <p class="reg">You don't have an account? </p>
            <a href="/register" data-link><input class="btn2" type="button" name="" value="Register here"> </a> 
        </div> 
    </footer>
    </section>
    </div>`;
    }
}