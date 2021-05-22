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
    const verifyCredentials = async (credentials) => {
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
          res.json();
        })
        .then((data) => {
          console.log(data);
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
