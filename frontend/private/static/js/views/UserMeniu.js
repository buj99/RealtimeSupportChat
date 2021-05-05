import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("User meniu ");
    this.loginCredentials = JSON.parse(
      window.localStorage.getItem("credentials")
    );
  }
  async getHTML() {
    return `<div class="user-meniu">

        <h1>Hello ${this.loginCredentials.username}</h1>
    <a href="/" data-link>home</a>

        </div>`;
  }
}
