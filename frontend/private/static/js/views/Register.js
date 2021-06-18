import { navigateTo } from "../utils.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register");
    }
    loadSetupDomElements() {
        this.addEventListenerToRegisterButton();
    }
    addEventListenerToRegisterButton() {
        const username = document.getElementById("username-input");
        const password = document.getElementById("password-input");
        const confirmPassword = document.getElementById("confirm-password-input");
        document
            .getElementsByClassName("register-button")[0]
            .addEventListener("click", (e) => {
                e.preventDefault();
                if (confirmPassword.value === password.value) {
                    fetch("http://localhost:3000/auth/register", {
                            method: "POST",
                            body: JSON.stringify({
                                username: username.value,
                                password: password.value,
                                confirmPassword: confirmPassword.value,
                            }),
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (data.success === true) {
                                navigateTo(`http://${window.location.host}`);
                            } else {
                                alert("Something went rong");
                            }
                        });
                } else {
                    alert("Password confirmation failed");
                }
            });
    }
    async getHTML() {
        return `
    <div class="login-box">
        <section class="image-container">
            <img src="./static/Images/background.jpg"/> 
        </section>

        <section class="register-container">
            <header>
                <h1 class="welcome-txt">
                    We can help you communicate with clients fast and efficient.
                    Real Time Support Chat waits for you. Connect with us! 
                </h1>
            </header>
        
            <form id="registerForm">
                <label class="label" for="username-input">
                    <input class="input" type="text" placeholder="Username" id="username-input" required>
                </label>
                <label class="label" for="password-input">
                    <input class="input" type="password" placeholder="Password" id="password-input" required>
                </label>
                <label class="label" for="confirm-password-input">
                    <input class="input" type="password" placeholder="Confirm password" id="confirm-password-input" required>
                </label>
                <button class="register-button" type="submit">
                    Register
                </button>
            </form>
            <div class="login-box-button">
            <p class="reg">You already have an account? </p>
            <a href="/login" data-link><input class="btn2" type="button" name="" value="Login"> </a>
        </div> 
            
        </section>
    </div>`;
    }
}