import { navigateTo } from "../utils.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Costumize");
  }
  loadSetupDomElements() {
    document
      .getElementsByClassName("register-button")[0]
      .addEventListener("click", () => {
        navigateTo(`http://${window.location.host}`);
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
        </section>
    </div>`;
  }
}
