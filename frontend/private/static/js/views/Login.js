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
                pass: pass.value,
            };

            var credentialsOK = verifyCredentials(this.credentials);
            //persist data using local storage
            if (credentialsOK) {
                window.localStorage.setItem(
                    "credentials",
                    JSON.stringify(this.credentials)
                );
                //change view
                if (this.credentials.username) {
                    navigateTo(window.location.href + this.credentials.username);
                }
            }
        });
        //helper functions
        const verifyCredentials = async(credentials) => {
            var changePage = true;
            var credentials = {
                username: this.credentials.username,
                password: this.credentials.pass,
            };
            fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "Application/json" },
                })
                .then((res) => {
                    if (res.status === 404) changePage = false;
                    return res.json();
                })
                .then((data) => {
                    console.log(data.auth_token); //debug
                    // window.localStorage.setItem('auth_token', data.auth_token)
                    fetch("http://localhost:3000/auth/uniquechattoke", {
                            method: "GET",
                            headers: { "auth_token": data.auth_token },
                        })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data1) => {
                            // console.log(data1.token) // debug
                            fetch("http://localhost:3000/asignchat", {
                                    method: "GET",
                                    headers: { "auth_unique_admin_token": data1.token },
                                })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data2) => {
                                    // console.log(data2.token) //debug
                                    window.sessionStorage.setItem('auth_chat', data2.token)
                                    fetch("http://localhost:3000/conversation", {
                                            method: "POST",
                                            headers: { "auth_chat": data2.token, "auth_token": data.auth_token },
                                            body: JSON.stringify({ message: "salut" }),
                                        })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data3) => {
                                            // console.log(data3.succes) //debug
                                            fetch("http://localhost:3000/conversation", {
                                                    method: "GET",
                                                    headers: { "auth_chat": data2.token },
                                                })
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .then((data4) => {
                                                    // console.log(data4) //debug
                                                    //sent data to UserMeniu
                                                    window.postMessage({ message: data4, auth_token: data.auth_token })
                                                })
                                        })
                                })

                        })

                    return changePage;
                });
        };
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